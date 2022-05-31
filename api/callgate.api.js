const tcpClient = new (require('../modules/TcpClient'))('callgate');

const logger = require(global._resolve('/modules/winston')).logger;

/**
 * Callgate Response Code
 * 0105 : Telecom Type 입력되지 않았을 때?
 * 0142 : SMS 발신시 전체 메세지 길이가 78byte보다 큰 경우
 * 4006 : CallQuest 서비스를 지원하지 않는 단말인 경우
 * 4009 : 런처 없음 (런처 삭제, 네트워크 불안정 등)
 * 8007 : decryption 실패
 * 8205 : userMdn 값이 없음
 * 8212 : 잘못된 userMdn
 */

module.exports = {
  async vdlCheck(payload) {
    const response = await tcpClient.sendMessage('VDL0000Q', payload);
    logger.info(`VDL0000S : ${response.resultCode}`);
    return response;
  },
  async vdlInquiry(payload) {
    const response = await tcpClient.sendMessage('VDL1000Q', payload);
    logger.info(`VDL1000S : ${response.resultCode}`);
    return response;
  },
  async vdlInvoke(payload) {
    const response = await tcpClient.sendMessage('VDL2000Q', payload);
    logger.info(`VDL2000S : ${response.resultCode}`);
    return response;
  },
  async edlValid(payload) {
    const response = await tcpClient.sendMessage('EDL0000Q', payload);
    logger.info(`EDL0000S : ${response.resultCode}`);
    return response;
  },
  async edlCheck(payload) {
    const response = await tcpClient.sendMessage('EDL1000Q', payload);
    logger.info(`EDL1000S : ${response.resultCode}`);
    return response;
  },
  async edlWakeup(payload) {
    const response = await tcpClient.sendMessage('EDL2000Q', payload);
    logger.info(`EDL2000S : ${response.resultCode}`);
    return response;
  },
  async edlSend(payload) {
    const response = await tcpClient.sendMessage('EDL3000Q', payload);
    logger.info(`EDL3000S : ${response.resultCode}`);
    return response;
  },
  async dmsSend(payload) {
    const response = await tcpClient.sendMessage('DMS1000Q', payload);
    logger.info(`DMS1000Q : ${response.resultCode}`);
    return response;
  },
  async dmsSendDynamic(payload) {
    const response = await tcpClient.sendMessage('DMS1001Q', payload);
    logger.info(`DMS1001Q : ${response.resultCode}`);
    return response;
  },
  async infopushSend(payload) {
    const response = await tcpClient.sendMessage('IP1000Q', payload);
    logger.info(`IP1000Q : ${response.resultCode}`);
    return response;
  },
};