const utils = require(global._resolve('/common/utils'));
const aesUtils = require('../../../common/aes-utils');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class CommonCallgate {
  constructor() {
    // customer specific
    this.customerId = process.env.CALLGATE_CUSTOMER_SERVICE_ID;
    this.key = process.env.CALLGATE_ENCRYPT_KEY;
    // this.serviceCodePrefix = process.env.CALLGATE_SVC_CODE_PREFIX;

    // common fields
    this.authKey = process.env.CALLGATE_AUTH_KEY;

    String.prototype.padding = utils.messagePadding;
  }

  encryptBody(key, body) {
    logger.debug(`====================> Raw Request : ${body}`);
    if (process.env.CALLGATE_ENCRYPTION_PADDING === 'ISO7816_4Padding') {
      return aesUtils.iso7816_4Encrypt(key, body);
    } else {
      return aesUtils.pkcs7Encrypt(key, body);
    }
  }

  decryptBody(key, encrypted) {
    if (process.env.CALLGATE_ENCRYPTION_PADDING === 'ISO7816_4Padding') {
      return aesUtils.iso7816_4Decrypt(key, encrypted);
    } else {
      return aesUtils.pkcs7Decrypt(key, encrypted);
    }
  }

  // request common method
  makeMessageHeader(requestBody) {
    if (requestBody.length > 0) {
      const messageSize = (requestBody.length + 40).toString().padding(4);
      const messageNo = `${this.userMdn}1000`.padding(20);
      const customerServiceId = this.customerId.padding(16);
      return `${messageSize}${messageNo}${customerServiceId}`;
    } else {
      logger.warn('empty message body');
      return '';
    }
  }

  // request common method
  make() {
    const requestBody = this.makeRequestBody(this.messageType);
    const messageHeader = this.makeMessageHeader(requestBody);
    const message = `${messageHeader}${requestBody}`;
    // logger.debug(`====================> Request : ${message}`);
    return message;
  }

  // request common method
  getResponseType() {
    return this.messageType.replace('Q', 'S');
  }

  // response common method
  makeResponse() {
    const encryptedBody = this.data.substring(40, this.data.length); // second param 없어도 됨
    const decryptedBody = this.decryptBody(this.key, encryptedBody);

    return this.makeResponseBody(decryptedBody);
  }

  // response common method
  decodeCommonResponse(body) {
    return {
      resultCode: body.substring(82, 86).trim(), // 4	0000 success
      contents: {
        messageType: body.substring(0, 10).trim(), // 10
        userMdn: body.substring(66, 82).trim(), // 16
      },
    };
  }

  // decodeCommon1Response(data, body) {
  //   return {
  //     headers: {
  //       messageSize: data.substring(0, 4).trim(),
  //       messageNo: data.substring(4, 24).trim(),
  //       customerServiceId: data.substring(24, 40).trim(),
  //     },
  //     contents: {
  //       messageType: body.substring(0, 10).trim(), // 10
  //       authKey: body.substring(10, 50).trim(), // 40
  //       serviceCode: body.substring(50, 66).trim(), // 16
  //       userMdn: body.substring(66, 82).trim(), // 16
  //       resultCode: body.substring(82, 86).trim(), // 4	0000 success
  //     },
  //   };
  // }
};