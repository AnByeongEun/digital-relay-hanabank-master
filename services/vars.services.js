const callgateApi = require('../api/callgate.api');

const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class VisualArsService {
  constructor() {}

  // Callgate Voice-Data Link Check (VDL0000Q)
  async vdlCheck(params) {
    try {
      return await callgateApi.vdlCheck(params); // ani
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate Voice-Data Link Inquiry (VDL1000Q)
  async vdlInquiry(params) {
    try {
      return await callgateApi.vdlInquiry(params); // ani
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate Voice-Data Link Invoke (VDL2000Q)
  async vdlInvoke(params) {
    try {
      return await callgateApi.vdlInvoke(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate EDL Valid (EDL0000Q)
  async edlValid(params) {
    try {
      return await callgateApi.edlValid(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate EDL Check (EDL1000Q)
  async edlCheck(params) {
    try {
      return await callgateApi.edlCheck(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate EDL Wakeup (EDL2000Q)
  async edlWakeup(params) {
    try {
      return await callgateApi.edlWakeup(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Callgate EDL Send (EDL3000Q)
  async edlSend(params) {
    try {
      return await callgateApi.edlSend(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Direct Messaging Service Send (DMS1000Q)
  async dmsSend(params) {
    try {
      return await callgateApi.dmsSend(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Direct Messaging Service Send Dynamic (DMS1001Q)
  async dmsSendDynamic(params) {
    try {
      return await callgateApi.dmsSendDynamic(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }

  // Info Push Send (IP1000Q)
  async infopushSend(params) {
    try {
      return await callgateApi.infopushSend(params);
    } catch (error) {
      logger.warn(error);
      throw error;
    }
  }
};