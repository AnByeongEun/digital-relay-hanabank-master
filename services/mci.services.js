const mciApi = require('../api/mci.api');

const messages = require('../messages');
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class ContactService {
  constructor() {}

  // 우체국 전화번호 전자금융약정 조회
  async getElectronicFinanceContract(params) {
    try {
      return await mciApi.getElectronicFinanceContract(params);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
};
