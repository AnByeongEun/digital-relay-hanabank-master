const tcpClient = new (require('../modules/TcpClient'))('mci');
const httpClient = new (require('../modules/HttpClient_Mci'))('mci').instance;
const iconv = new require('iconv-lite');
const utils = require(global._resolve('/common/utils'));

const getMciUrl = (path = '') => {
  return `${process.env.MCI_PROTOCOL}://${process.env.MCI_HOST}:${process.env.MCI_PORT}${path}`;
};

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = {
  // 하나은행 영업점 조회
  async getBranch(payload) {
    const headers = {
      headers: {
        'Context-Type': 'text/plain; charset=EUC-KR',
        Accept: 'text/plain',
      },
      responseType: 'arraybuffer',
    };
    // 영업점 MCA거래 시작
    const message = new (require('../messages/mci/BranchDataQ'))(payload, 'Q');
    const requestMessage = message.make();
    const responsePayload = await httpClient.post(getMciUrl('/HttpCwmAdapter'), iconv.encode(requestMessage, 'EUC-KR'), headers);

    // 영업점 응닶값 변환
    const responseMessage = iconv.decode(responsePayload.data, 'EUC-KR');
    const response = new (require('../messages/mci/BranchDataS'))(responseMessage, 'S').makeResponse();

    return response;
  },
  // 하나은행 카카오톡 전송
  async SendKakaoTalkQ(payload) {
    const headers = {
      headers: {
        'Context-Type': 'text/plain; charset=EUC-KR',
        Accept: 'text/plain',
      },
      responseType: 'arraybuffer',
    };
    const message = new (require('../messages/mci/SendKakaoTalkQQ'))(payload, 'Q');
    const requestMessage = message.makeUMS();
    const responsePayload = await httpClient.post(getMciUrl('/HttpCwmAdapter'), requestMessage, headers);

    // 영업점 응닶값 변환
    const responseMessage = iconv.decode(responsePayload.data, 'EUC-KR');
    const response = new (require('../messages/mci/SendKakaoTalkS'))(responseMessage, 'S').makeResponse();

    return response;
  },

};