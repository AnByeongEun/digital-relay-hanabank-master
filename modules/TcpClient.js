const net = require('net');

const messages = require('../messages');
const interfaceTrace = require(global._resolve('/modules/winston')).interfaceTrace;
const logger = require(global._resolve('/modules/winston')).logger;

const utils = require(global._resolve('/common/utils'));

const options = require('../config/tcp-client');

module.exports = class TcpClient {
  constructor(name) {
    this.name = name;
    this.host = options[name].host;
    this.port = options[name].port;
    this.timeout = Number(process.env.TCP_CLIENT_TIMEOUT);
  }

  getMessage(messageType, params) {
    try {
      return new messages[this.name][messageType](params);
    } catch (error) {
      throw new messages.error.UnknownMessageError(messageType);
    }
  }

  getConnection() {
    return net.connect({ host: this.host, port: this.port });
  }

  // TODO: parameters 변경 (messageType, params)
  /**
   * @param {string} messageType messages 하위에 정의한 메세지 클래스명
   * @param {object} params 전문 구성에 필요한 parameters
   */
  sendMessage(messageType, params) {
    try {
      const message = this.getMessage(messageType, params);
      console.log(message.make());
      const connection = this.getConnection();

      connection.on('error', function(error) {
        logger.error('Socket Error: ', JSON.stringify(error));
      });

      const startTime = new Date().getTime();
      const transactionId = utils.generateRandomString(8).toUpperCase();
      const targetName = this.name.toUpperCase();
      const traceMessage = `${messageType} ${params.ani}`;// TODO: DATA (messateType, ani 수정)

      interfaceTrace.req(targetName, 'TCP', this.host, transactionId, traceMessage);
      const requestMessage = message.make();
      this.writeData(connection, requestMessage);

      return new Promise((resolve, reject) => {
        try {
          connection.on('data', (chunk) => {
            try {
              const responseMessageType = message.getResponseType();
              const response = new messages[this.name][responseMessageType](chunk).makeResponse();
              logger.debug(`====================> Response [${responseMessageType}] \n${JSON.stringify(response, null, 2)} `);
              const elapsed = new Date().getTime() - startTime;
              const traceMessage = `${responseMessageType} ${params.ani}`;
              interfaceTrace.res(targetName, 'TCP', this.host, transactionId, traceMessage, elapsed, response.resultCode);
              connection.end();
              resolve(response);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          });
          connection.on('error', function(error) {
            this.end();
            reject(new messages.error.ConnectionRefusedError(error.message));
          });
          connection.setTimeout(this.timeout, function () {
            connection.end();
            reject(new messages.error.ConnectionTimeoutError(`Connection Timeout ${this.timeout}ms`));
          });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    } catch (error) {
      console.warn(error.message);
      throw error;
    }
  }

  writeData(conn, data) {
    var success = !conn.write(data);
    if (!success) {
      (function(conn, data) {
        conn.once('drain', function() {
          this.writeData(conn, data);
        });
      })(conn, data);
    }
  }
};