const net = require('net');

const utils = require(global._resolve('/common/utils'));

const journeyApi = require('../api/journey.api');

const messages = require('../messages');
const apiTrace = require(global._resolve('/modules/winston')).apiTrace;
const logger = require(global._resolve('/modules/winston')).logger;

const reqApiTrace = (transactionId, messageObject) => {
  const resourceName = 'SARS'; // 고정
  const message = `${messageObject.messageType} ${messageObject.chKey}`;
  apiTrace.req(transactionId, 'TCP', resourceName, message);
};

const resApiTrace = (transactionId, messageObject, startTime, resultCode) => {
  const resourceName = 'SARS'; // 고정
  const elapsed = new Date().getTime() - startTime;
  const message = `${messageObject.messageType} ${messageObject.chKey}`;
  apiTrace.res(transactionId, 'TCP', resourceName, message, elapsed, resultCode);
};

/**
 * > Request Message
 * Message Header (total 80)
 *   MessageType(10) : SARS0001 & SARS0002, 홀수 => 요청, 짝수 => 응답
 *   chType(6) : CALL(콜봇), MWEB(모바일웹), SARS(스마트ARS) 등
 *   chKey(20) : callkey, webkey 등 각 채널 내에서 사용하는 데이터 키
 *   ani(16) : 전화번호
 *   reqDttm(18) : 전송일시(YYYYMMDDHHmmssSSS_)
 *   length(10) : 헤더를 제외한 데이터의 총 길이 (ex. 142일 경우 142_ _ _ _ _ _ _로 표기)
 * Message Body (offset 80 ~)
 *
 * > Response Message
 * Message Header (일단 안보냄, TODO: 헤더 필요 없으면 굳이 안보냄, 확인)
 * Message Body
 *   result code (4) : 코드만 내려준다 메시지 필요없음. 필요하면 문서로 전달
 *   message (100) : 메시지 필요?
 *   reqDttm(18) : 응답 시간 필요?
 */

module.exports = class TcpServer {
  constructor({ port }) {
    this.port = port || 5010;
    // 특정 서비스별로 나눠 생성하기 위해 Class로 구현
    //   ex. Smart ARS = 5010, Stupid ARS = 5020, etc
    this.headerSize = 80; // 고정
  }

  convertTextToObject(data) {
    try {
      const bodyLength = Number(data.substring(70, 80).trim());

      if (isNaN(bodyLength)) {
        throw new messages.error.InvalidDataError('Wrong Message Length Data Type');
      }

      if (data.length !== this.headerSize + bodyLength) {
        throw new messages.error.InvalidDataError('Wrong Message Length');
      }

      const object = {
        messageType: data.substring(0, 10).trim(),
        chType: data.substring(10, 16).trim(),
        chKey: data.substring(16, 36).trim(),
        ani: data.substring(36, 52).trim(),
        reqDttm: data.substring(52, 70).trim(),
        bodyLength: bodyLength,
        body: data.substring(80),
      };

      if (Number(bodyLength) !== object.body.length) {
        throw new messages.error.InvalidDataError('Wrong Message Body Length');
      }

      console.log(JSON.stringify(object, null, 2));

      return object;
    } catch (error) {
      // error message 구분 위해 분기
      if (error.code === 126) { // InvalidDataError code : 126
        throw error;
      } else {
        throw new messages.error.InvalidDataError('Wrong Data');
      }
    }
  }

  // message type에 매핑되는 Journey API 반환
  getServiceHandler(m) {
    if (m.messageType === 'SARS0001') {
      return journeyApi.sarsLink(new messages.server.tcp.SARS0001(m));
    } else if (m.messageType === 'SARS0003') {
      return journeyApi.sarsSave(new messages.server.tcp.SARS0003(m));
    } else {
      throw new messages.error.UnknownMessageError(m.messageType);
    }
  }

  initServer() {
    const server = net.createServer((socket) => {
      console.log(`${socket.address().address} connected.`);

      const startTime = new Date().getTime();
      const transactionId = utils.generateRandomString(8).toUpperCase();
      let messageObject = {};

      socket.on('data', async (data) => {
        try {
          console.log(`rcv: ${data}`);

          // message decode (Text 전문 -> 메시지 타입 객체 변환)
          messageObject = this.convertTextToObject(data.toString());

          // message decode 실패일 경우 trace 남기지 않음
          reqApiTrace(transactionId, messageObject);

          const journeyResponse = await this.getServiceHandler(messageObject);
          // console.log(`send: ${JSON.stringify(journeyResponse.data)}`);
          socket.write(JSON.stringify(journeyResponse.data));
          resApiTrace(transactionId, messageObject, startTime, journeyResponse.resCode);
        } catch (error) {
          // console.error(1, error.message);
          this.sendErrorMessage(error, socket, messageObject, transactionId, startTime);
        }
      });

      // client와 접속이 끊기는 메시지 출력
      socket.on('close', function() {
        console.log('client disconnted.'); // for debug
      });

      socket.on('error', function(error) {
        // console.error(2, error.message);
        this.sendErrorMessage(error, socket, messageObject, transactionId, startTime);
      });
    });

    // 에러가 발생할 경우 화면에 에러메시지 출력
    server.on('error', function(err) {
      console.error(`err${err}`);
    });

    // 입력된 포트로 접속이 가능하도록 대기
    server.listen(this.port, () => {
      console.log(`TcpServer listening on [${this.port}]`);
    });
  }

  sendErrorMessage(error, socket, messageObject, transactionId, startTime) {
    const code = (error.code || 999).toString().padStart(4, 0); // 999 : unknown
    const message = error.message.padEnd(100, ' ') || 'unknown';

    const isMessageDecoded = !(Object.keys(messageObject).length === 0 && messageObject.constructor === Object);

    if (isMessageDecoded) {
      // messageObject가 empty가 아닐 경우만 Trace 남김 => message decode 실패했을 경우 trace 남기지 않음
      resApiTrace(transactionId, messageObject, startTime, code);
    }

    console.log(`send: ${code}${message}`);
    socket.write(`${code}${message}`);
  }
};