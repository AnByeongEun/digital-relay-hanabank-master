const express = require('express');
const router = express.Router();
const iconv = require('icon-lite');

const utils = require(global._resolve('common/utils'));
const moment = require('moment');

const ContactService = new (require('../services/contact.services'));
const VisualArsService = new (require('../services/vars.services'));
const HanabizService = new (require('../services/hanabiz.services'));
const StatService = new (require('../services/stat.services'));

const AES256 = require('./middlewares/AES256');
const { ApiAction } = require('./common/wrappers');

const messages = require('../messages/server/api/CreateLinkAndContactKey');
const middlewares = require('./middlewares');

const Prometheus = require('prom-client');
const logger = require(global._resolve('/modules/winston')).logger;
const journeyLogger = require(global._resolve('/modules/winston')).journeyLogger;

router.get('/metrics', function(req, res) {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

// function paddingByteLen(str, maxByte) {
//   for (b = i = 0; c = str.charCodeAt(i);) {
//     b += c >> 7 ? 2 : 1;
//     if (b > maxByte) break;
//     i++;
//   }
//   return str.padding(maxByte);
// }

router.post('/decodeAni', ApiAction(async (req, res, next) => {
  const decodeAni = AES256.decrypt(req.body.ani);

  let result = {
    ANI: decodeAni,
  };
  res.json(result);
}));

/**
 * SOE -> Relay
 */

// Callgate Voice-Data Link Check (VDL0000Q)
router.post('/link/launch/check', ApiAction(async (req, res, next) => {
  let returnData;
  try {
    const result = await VisualArsService.vdlCheck(req.body);
    if (result.resultCode == '0000') {
      logger.info('VDL0000Q SUCC');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      let currentTime = moment().format('YYYYMMDDmmssSSS');
      returnData = {
        resCode: result.resultCode,
        resMsg: 'VDL0000Q SUCC',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          userMdn: result.contents.userMdn,
        },
      };
      res.json(returnData);
    } else {
      logger.info('VDL0000Q FAIL');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      let currentTime = moment().format('YYYYMMDDmmssSSS');
      returnData = {
        resCode: result.resultCode,
        resMsg: 'VDL0000Q FAIL',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          userMdn: result.contents.userMdn,
        },
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.info(`VDL0000Q ERROR : ${error}`);
    req.body.ani = AES256.encrypt(req.body.ani);
    logger.info(JSON.Stringify(req.body));
    let currentTime = moment().format('YYYYMMDDmmssSSS');
    returnData = {
      resCode: '9999',
      resMsg: 'VDL0000Q ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// Callgate Voice-Data Link Inquiry (VDL1000Q)
router.post('/link/launch/inquiry', ApiAction(async (req, res, next) => {
  // 3초 지연
  // await new Promis(r => setTimeout(r, 3000));
  let returnData;
  try {
    const result = await VisualArsService.vdlInquiry(req.body);
    if (result.resultCode == '0000') {
      logger.info('VDL1000Q SUCC');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      let currentTime = moment().format('YYYYMMDDmmssSSS');
      returnData = {
        resCode: result.resultCode,
        resMsg: 'VDL1000Q SUCC',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          userMdn: result.contents.userMdn,
          platformType: result.contents.platformType,
          serviceSupportYn: result.contents.serviceSupportYn,
          launcherInstallYn: result.contents.launcherInstallYn,
          serviceInvokeType: result.contents.serviceInvokeType,
          phoneType: result.contents.phoneType,

        },
      };
    } else {
      logger.info('VDL1000Q FAIL');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      let currentTime = moment().format('YYYYMMDDmmssSSS');
      returnData = {
        resCode: result.resultCode,
        resMsg: 'VDL1000Q FAIL',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          userMdn: result.contents.userMdn,
          platformType: result.contents.platformType,
          serviceSupportYn: result.contents.serviceSupportYn,
          launcherInstallYn: result.contents.launcherInstallYn,
          serviceInvokeType: result.contents.serviceInvokeType,
          phoneType: result.contents.phoneType,
        },
      };
    }

    res.json(returnData);
  } catch (error) {
    logger.info(`VDL1000Q ERROR : ${error}`);
    req.body.ani = AES256.encrypt(req.body.ani);
    logger.info(JSON.Stringify(req.body));
    let currentTime = moment().format('YYYYMMDDmmssSSS');
    returnData = {
      resCode: '9999',
      resMsg: 'VDL1000Q ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// Callgate Voice-Data Link Invoke (VDL2000Q)
router.post('/link/launch/sendLink', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let resData;
  let result;
  let sendResultParam;

  try {
    // 이력데이터 생성
    sendResultParam = {
      linkKey: param.linkKey,
      sendType: 'L',
      code: '',
      type: '',
      reqDttm: param.reqDttm,
      url: `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_NODE_HOST}:${process.env.JOURNEY_NODE_PORT}`,
      contactPath: '/api/link/sendResult',
      reqTime: currentTime,
    };

    result = await VisualArsService.vdlInvoke(req.body);
    sendResultParam.code = result.resultCode;
    sendResultParam.type = result.contents.serviceInvokeType;

    if (result.resultCode == '0000') {
      logger.info('VDL2000Q SUCC');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: result.resultCode,
        resMsg: 'LAUNCH LAUNCHER SUCC',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          serviceInvokeType: result.contents.serviceInvokeType,
          userMdn: result.contents.userMdn,
        },
      };
    } else {
      logger.info('VDL2000Q FAIL');
      req.body.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: result.resultCode,
        resMsg: 'LAUNCH LAUNCHER FAIL',
        resDttm: currentTime,
        data: {
          resultCode: result.resultCode,
          userMdn: result.contents.userMdn,
        },
      };
    }
    res.json(resData);
  } catch (error) {
    logger.info(`VDL2000Q ERROR : ${error}`);
    req.body.ani = AES256.encrypt(req.body.ani);
    logger.info(JSON.Stringify(req.body));
    let currentTime = moment().format('YYYYMMDDmmssSSS');
    resData = {
      resCode: '9999',
      resMsg: 'LAUNCH LAUNCHER ERROR',
      resDttm: currentTime,
    };
    res.json(resData);
  }

  // 링크 발송 이력 저장
  // 저니 로그
  journeyLogger.info(JSON.stringify(sendResultParam));
  try {
    const sendSaveResult = await ContactService.sendLinkSave(sendResultParam);

    if (sendSaveResult.resultCode == '0000') {
      logger.info('LAUNCH LAUNCHER SAVE SUCC');
      logger.info(JSON.Stringify(req.body));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: sendSaveResult.resCode,
        resMsg: 'LAUNCH LAUNCHER SAVE SUCC',
        resDttm: currentTime,
      };
    } else {
      logger.info('LAUNCH LAUNCHER SAVE FAIL');
      logger.info(JSON.Stringify(req.body));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: sendSaveResult.resultCode,
        resMsg: 'LAUNCH LAUNCHER SAVE FAIL',
        resDttm: currentTime,
      };
    }
  } catch (error) {
    logger.info('LAUNCH LAUNCHER SAVE ERROR');
    logger.info(JSON.Stringify(req.body));

    currentTime = moment().format('YYYYMMDDmmssSSS');
    resData = {
      resCode: '9000',
      resMsg: 'LAUNCH LAUNCHER SAVE ERROR',
      resDttm: currentTime,
    };
  }
}));

// Callgate Voice-Data Link Invoke (VDL2000Q)
router.post('/link/talk/sendLink', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let resData;
  let result;
  let sendResultParam;
  let sendSaveResult;

  try {
    // 이력데이터 생성
    sendResultParam = {
      linkKey: param.linkKey,
      sendType: 'U',
      code: '',
      type: '',
      umsText: param.slinkUrl,
      reqDttm: param.reqDttm,
      url: `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_NODE_HOST}:${process.env.JOURNEY_NODE_PORT}`,
      contactPath: '/api/link/sendResult',
      reqTime: currentTime,
    };

    result = await HanabizService.sendLinkTalk(param);
    sendResultParam.code = result.data.PROC_RSLT_CD;
    sendResultParam.type = result.data.PROC_RSLT_DV_CD;

    if (result.data.PROC_RSLT_CD == '0000') {
      logger.info('UMS SEND SUCC');
      param.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));
      param.ani = AES256.decrypt(req.body.ani);

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: '0000',
        resMsg: 'UMS SEND SUCC',
        resDttm: currentTime,
        data: {
          userMdn: param.ani,
        },
      };
    } else {
      logger.info('UMS SEND FAIL');
      param.ani = AES256.encrypt(req.body.ani);
      logger.info(JSON.Stringify(req.body));
      param.ani = AES256.decrypt(req.body.ani);

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: result.data.PROC_RSLT_CD,
        resMsg: 'UMS SEND FAIL',
        resDttm: currentTime,
        data: {
          userMdn: param.ani,
        },
      };
    }
    res.json(resData);
  } catch (error) {
    logger.info(`UMS SEND ERROR : ${error}`);
    param.ani = AES256.encrypt(req.body.ani);
    logger.info(JSON.Stringify(req.body));
    param.ani = AES256.decrypt(req.body.ani);

    sendResultParam.sendType = 'F';

    journeyLogger.info(JSON.stringify(sendResultParam));
    try {
      sendSaveResult = await ContactService.sendLinkSave(sendResultParam);
      if (sendSaveResult.resCode == '0000') {
        logger.info('UMS SEND RESULT SAVE SUCC');
        logger.info(JSON.stringify(sendResultParam));
      } else {
        logger.info('UMS SEND RESULT SAVE FAIL');
        logger.info(JSON.stringify(sendResultParam));
      }
    } catch (error) {
      logger.info('UMS SEND RESULT SAVE SUCC');
      logger.info(JSON.stringify(sendResultParam));
    }

    resData = {
      resCode: '9999',
      resMsg: 'LAUNCH LAUNCHER ERROR',
      resDttm: currentTime,
    };
    res.json(resData);
  }

  // 링크 발송 이력 저장
  // 저니 로그
  journeyLogger.info(JSON.stringify(sendResultParam));
  try {
    const sendSaveResult = await ContactService.sendLinkSave(sendResultParam);

    if (sendSaveResult.resCode == '0000') {
      logger.info('UMS SEND RESULT SAVE SUCC');
      logger.info(JSON.Stringify(sendResultParam));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: sendSaveResult.resCode,
        resMsg: 'UMS SEND RESULT SAVE SUCC',
        resDttm: currentTime,
      };
    } else {
      logger.info('UMS SEND RESULT SAVE FAIL');
      logger.info(JSON.Stringify(sendResultParam));

      currentTime = moment().format('YYYYMMDDmmssSSS');
      resData = {
        resCode: sendSaveResult.resCode,
        resMsg: 'UMS SEND RESULT SAVE FAIL',
        resDttm: currentTime,
      };
    }
  } catch (error) {
    logger.info('UMS SEND RESULT SAVE ERROR');
    logger.info(JSON.Stringify(sendResultParam));

    currentTime = moment().format('YYYYMMDDmmssSSS');
    resData = {
      resCode: '9999',
      resMsg: 'UMS SEND SAVE LINK ERROR',
      resDttm: currentTime,
    };
  }
}));

router.post('/branch/allList', ApiAction(async (req, res, next) => {
  const mci = require('../api/mci.api');
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;
  let returnData;
  try {
    result = await mci.getBranch(req.body);
    if (result.resCode == '0000') {
      logger.info('BRANCH ALL LIST LOAD SUCC');
      logger.info(JSON.stringify(req.body));
      res.json(result);
    } else {
      logger.info('BRANCH ALL LIST LOAD FAIL');
      logger.info(JSON.stringify(req.body));
      res.json(result);
    }
  } catch (error) {
    logger.info(`BRANCH ALL LIST LOAD ERROR : ${error}`);
    logger.info(JSON.stringify(req.body));
    returnData = {
      resCode: '9999',
      resMsg: 'BRANCH ALL LIST LOAD ERROR',
      resDttm: currentTime,
    };
    res.json(result);
  }
}));

// 컨택/링크 키 통합 발행 요청
router.post('/link/create', ApiAction(async (req, res, next) => {
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');

  let param = req.body;
  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_NODE_PORT}`;
  param.contactPath = '/api/contactkey/create';
  param.reqTime = currentTime;

  let userMdn = param.ani;
  const eAni = AES256.encrypt(userMdn);
  const dAni = AES256.decrypt(eAni);

  let returnData;
  let ContactKeyCreateResult;
  let LinkKeyCreateResult;
  let LinkKeyCreateResultSave;

  try {
    ContactKeyCreateResult = await ContactService.ContactKeyCreate(param);

    if (ContactKeyCreateResult.resCode == '0000') {
      logger.info('CONTACT KEY CREATE SUCC');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;

      param.contactKey = ContactKeyCreateResult.data.contactKey;

      if (param.previewYn == 'Y') {
        param.redirectUrl = process.env.PREVIEW_HANABANK_URL;
      } else {
        param.redirectUrl = process.env.ORIGIN_HANABANK_URL;
      }
    } else {
      logger.info('CONTACT KEY CREATE FAIL');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;

      returnData = {
        resCode: ContactKeyCreateResult.resCode,
        resMsg: ContactKeyCreateResult.resMsg,
        resDttm: ContactKeyCreateResult.resDttm,
      };

      return res.json(returnData);
    }
  } catch (error) {
    logger.info('CONTACT KEY CREATE FAIL');
    param.ani = eAni;
    logger.info(JSON.stringify(param));
    param.ani = dAni;

    let returnData = {
      resCode: '9999',
      resMsg: 'CONTACTKEY CREATRE ERROR',
      resDttm: currentTime,
    };
    return res.json(returnData);
  }

  try {
    LinkKeyCreateResult = await ContactService.LinkKeyCreate(param);
    if (LinkKeyCreateResult.resCode == '0000') {
      logger.info('LINK CREATE SUCC');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;

      param.linkKey = LinkKeyCreateResult.data.linkKey;
      param.slinkUrl = LinkKeyCreateResult.data.slinkUrl;
      param.startYmd = LinkKeyCreateResult.data.startYmd;
      param.endYmd = LinkKeyCreateResult.data.endYmd;
      param.startTime = LinkKeyCreateResult.data.startTime;
      param.endTime = LinkKeyCreateResult.data.endTime;
    } else {
      logger.info('LINK CREATE FAIL');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;
      returnData = {
        resCode: LinkKeyCreateResult.resCode,
        resMsg: LinkKeyCreateResult.resMsg,
        resDttm: LinkKeyCreateResult.resDttm,
      };

      return res.json(returnData);
    }

    // 컨택키 생성 resCode가 0000이 아닐때
  } catch (error) {
    logger.info(`LINK CREATE ERROR : ${error}`);
    param.ani = eAni;
    logger.info(JSON.stringify(param));
    param.ani = dAni;

    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'LINK CREATE ERROR',
      resDttm: currentTime,
    };

    return res.json(returnData);
  }

  try {
    param.url = `${process.env.LINK_PROTOCOL}://${process.env.LINK_HOST}:${process.env.LINK_PORT}`;
    param.contactPatt = '/api/link/createResult';
    param.reqTime = currentTime;

    param.ani = eAni;
    journeyLogger.info(JSON.stringify(param));
    param.ani = dAni;

    LinkKeyCreateResultSave = await ContactService.LinkKeyCreateSave(param);

    if (LinkKeyCreateResultSave.resCode == '0000') {
      logger.info('LINK CREATE RESULT SAVE SUCC');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;

      return res.json(LinkKeyCreateResult);
    } else {
      logger.info('LINK CREATE RESULT SAVE FAIL');
      param.ani = eAni;
      logger.info(JSON.stringify(param));
      param.ani = dAni;

      return res.json(LinkKeyCreateResult);
    }
  } catch (error) {
    logger.info(`LINK CREATE RESULT SAVE ERROR : ${error}`);
    param.ani = eAni;
    logger.info(JSON.stringify(param));
    param.ani = dAni;

    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    returnData = {
      resCode: '9999',
      resMsg: 'LINK CREATE RESULT SAVE ERROR',
      resDttm: currentTime,
    };
  }
  return res.json(returnData);
}));

/**
 * Mobile Web -> Relay
 */

// 링크 정보 요청
router.post('/link/info', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let returnData;
  let result;
  try {
    result = await HanabizService.sendLinkTalk(param);
    if (result.resCode == '0000') {
      logger.info('LINK INFO SUCC');
      logger.info(JSON.stringify(param));
      res.json(result);
    } else {
      logger.info('LINK INFO FAIL');
      logger.info(JSON.stringify(param));
      res.json(result);
    }
  } catch (error) {
    logger.error(`LINK INFO ERROR : ${error}`);
    logger.error(JSON.stringify(param));

    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    returnData = {
      resCode: '9999',
      resMsg: 'LINK INFO ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 필요서류 우선순위 목록
router.post('/biz/priList', ApiAction(async (req, res, next) => {
  const chType = req.body.chType;
  const reqDttm = req.body.reqDttm;
  const param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;
  let returnData;
  try {
    // result = await HanabizService.getNecessaryDocumentPriorityList(chType, reqDttm);
    result = await HanabizService.getPriInfoDocumentList(param);
    if (result.data.length == 0) {
      logger.info('BIZ PRILIST NO DATA');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');

      returnData = {
        resCode: '0090',
        resMsg: 'BIZ PRILIST NO DATA',
        resDttm: currentTime,
        data: result.data,
      };
      return res.json(returnData);
    } else {
      logger.info('BIZ PRILIST SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');

      returnData = {
        resCode: '0000',
        resMsg: 'BIZ PRILIST SUCC',
        resDttm: currentTime,
        data: result.data,
      };
      return res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ PRILIST ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'BIZ PRILIST ERROR',
      resDttm: currentTime,
    };
    return res.json(returnData);
  }
}));

// 필요서류 목록
router.post('/biz/allList', ApiAction(async (req, res, next) => {
  const groupCd = req.body.groupCd;
  const param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;
  try {
    if (groupCd) {
      logger.info('BIZ ALL LIST SUCC');
      logger.info(JSON.stringify(param));
      result = await HanabizService.getNecessaryDocumentList(groupCd);
      res.json(result);
    } else {
      logger.info('BIZ ALL LIST FAIL : GROUP CODE REQUIRE');
      logger.info(JSON.stringify(param));
      let returnData = {
        resCode: '0030',
        resMsg: 'BIZ ALL LIST GROOUP CODE REQUIRE',
        resDttm: currentTime,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ ALL LIST ERROR : ${error}`);
    logger.error(JSON.stringify(param));

    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'BIZ ALL LIST FAIL',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 특정 필요서류 정보 조회
router.post('/biz/targetList', ApiAction(async (req, res, next) => {
  const param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;
  try {
    // const result = await HanabizService.getTargetDocumentList(param);
    result = await HanabizService.getTargetInfoDocumentList(param);
    if (result.data.length != 0) {
      logger.info('BIZ TARGET LIST SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');

      let returnData = {
        resCode: '0000',
        resMsg: 'BIZ TARGET LIST SUCC',
        resDttm: currentTime,
        data: result.data,
      };
      res.json(returnData);
    } else {
      logger.info('BIZ TARGET LIST FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');

      let returnData = {
        resCode: '0000',
        resMsg: 'BIZ TARGET LIST FAIL',
        resDttm: currentTime,
        data: result.data,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ TARGET LIST ERROR : ${error}`);
    logger.error(JSON.stringify(param));

    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'BIZ TARGET LIST ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 공유 링크 정보 회신
router.post('/share/info', ApiAction(async (req, res, next) => {
  const param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;
  try {
    result = await HanabizService.getShareInfoDocumentList(param);
    if (result.data.length != 0) {
      logger.info('LINK SHARE INFO SUCC');
      logger.info(JSON.stringify(param));

      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'LINK SHARE INFO SUCC',
        resDttm: currentTime,
        data: result.data,
      };
      res.json(returnData);
    } else {
      logger.info('LINK SHARE INFO FAIL');
      logger.info(JSON.stringify(param));

      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
        data: result.data,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`LINK SHARE INFO ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'LINK SHARE INFO ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// TODO: 타겟 영업점 부가정보

// 통합통계 Web -> Relay

// 필요서류 이력 저장 요청
router.post('/biz/save', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_NODE_PORT}`;
  param.contactPath = '/api/biz/history';
  param.reqTime = currentTime;
  let result;

  try {
    param.ani = AES256.encrypt(param.ani);
    journeyLogger.info(JSON.stringify(param));

    param.ani = AES256.decrypt(param.ani);
    result = await StatService.saveNecessaryDocument(param);

    param.ani = AES256.encrypt(param.ani);
    if (result.resCode == '0000') {
      logger.info('BIZ SAVE SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'BIZ SAVE SUCC',
        resDttm: currentTime,
      };
      res.json(returnData);
    } else {
      logger.info('BIZ SAVE FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ SAVE ERROR : ${error}`);
    param.ani = AES256.encrypt(param.ani);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'BIZ SAVE ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 영업점 이력 저장 요청
router.post('/branch/save', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_NODE_PORT}`;
  param.contactPath = '/api/branch/history';
  param.reqTime = currentTime;
  let result;
  try {
    param.ani = AES256.encrypt(param.ani);
    journeyLogger.info(JSON.stringify(param));

    param.ani = AES256.decrypt(param.ani);
    result = await StatService.saveBranch(req.body);
    param.ani = AES256.encrypt(param.ani);

    if (result.resCode == '0000') {
      logger.info('BRANCH SAVE SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'BRANCH SAVE SUCC',
        resDttm: currentTime,
      };
      res.json(returnData);
    } else {
      logger.info('BRANCH SAVE FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ SAVE ERROR : ${error}`);
    param.ani = AES256.encrypt(param.ani);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'BIZ SAVE ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 필요서류 우선순위 설정
router.post('/config/biz/priority', ApiAction(async (req, res, next) => {
  let param = req.body;
  let result;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_PORT}`;
  param.contactPath = '/api/config/biz/priority';
  param.reqTime = currentTime;
  journeyLogger.info(JSON.stringify(param));

  try {
    result = await HanabizService.sendBizPriority(param);
    if (result.resCode == '0000') {
      logger.info('BIZ PRILSIT SET SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    } else {
      logger.info('BIZ PRILSIT SET FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ PRILSIT SET ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: result.resCode,
      resMsg: result.resMsg,
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 필요서류 수동 동기화
router.post('/config/biz/sync', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;

  try {
    result = await HanabizService.configBizSync();
    if (result.result) {
      logger.info('BIZ SYNC SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'BIZ SYNC SUCC',
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    } else {
      logger.info('BIZ SYNC FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`BIZ SYNC ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: result.resCode,
      resMsg: result.resMsg,
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 상담원 수동 동기화
router.post('/config/agt/sync', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let result;

  try {
    result = await HanabizService.configAgtSync();
    if (result.result) {
      logger.info('AGT SYNC SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'AGT SYNC SUCC',
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    } else {
      logger.info('AGT SYNC FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`AGT SYNC ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: result.resCode,
      resMsg: result.resMsg,
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// 저니 통계 이력 전송
router.post('/sendHistory', ApiAction(async (req, res, next) => {
  let param = req.body;
  const fs = require('fs');
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let date = param.YMD;

  let logData = [];
  let array;

  try {
    logData = fs.readFileSync(`../var/logs/journey/LOG_AICC_MULTIMODAL_RELAY_JOURNEY_${date}.log`, 'utf8').toString().split('\n');
    for (let i in array) {
      logData.push(array[i]);
    }
    logger.info('JOURNEY LOG FILE SEND SUCC');
    logger.info(JSON.stringify(param));

    let returnData = {
      resCode: '0000',
      resMsg: 'SUCC',
      resDttm: currentTime,
      data: logData,
    };
    res.json(returnData);
  } catch (error) {
    logger.error(`JOURNEY LOG FILE NOT FOUND : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'ERROR : JOURNEY LOG FILE NOT FOUND',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

/**
 * Smart ARS -> Relay
 */
// TODO: 스마트 ARS 런칭 결과 저장
router.post('/sars/link', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let resultSave;
  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_NODE_PORT}`;
  param.contactPath = '/api/sars/link';
  param.reqTime = currentTime;
  try {
    param.ani = AES256.encrypt(param.ani);
    resultSave = await StatService.sarsLink(param);
    param.ani = AES256.decrypt(param.ani);

    if (resultSave.resCode == '0000') {
      logger.info('SARS LINK SUCC');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: '0000',
        resMsg: 'SARS LINK SUCC',
        resDttm: currentTime,
      };
      return res.json(returnData);
    } else {
      logger.info('SARS LINK FAIL');
      logger.info(JSON.stringify(param));
      currentTime = moment().format('YYYYMMDDHHmmssSSS');
      let returnData = {
        resCode: resultSave.resCode,
        resMsg: resultSave.resMsg,
        resDttm: currentTime,
      };
      return res.json(returnData);
    }
  } catch (error) {
    logger.error(`SARS LINK ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'SARS LINK ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));

// TODO: 스마트 ARS 통계 저장
router.post('/sars/save', ApiAction(async (req, res, next) => {
  let param = req.body;
  let currentTime = moment().format('YYYYMMDDHHmmssSSS');
  let returnData;

  param.url = `${process.env.JOURNEY_PROTOCOL}://${process.env.JOURNEY_HOST}:${process.env.JOURNEY_PORT}`;
  param.contactPath = '/api/sars/save';
  param.reqTime = currentTime;
  try {
    param.ani = AES256.encrypt(param.ani);
    const result = await StatService.sarsSave(param);
    param.ani = AES256.decrypt(param.ani);
    if (result.resCode == '0000') {
      logger.info('SARS SAVE SUCC');
      logger.info(JSON.stringify(param));
      let returnData = {
        resCode: '0000',
        resMsg: 'SARS SAVE SUCC',
        resDttm: currentTime,
        data: result,
      };
      res.json(returnData);
    } else {
      logger.info('SARS SAVE FAIL');
      logger.info(JSON.stringify(param));
      let returnData = {
        resCode: result.resCode,
        resMsg: result.resMsg,
        resDttm: currentTime,
      };
      res.json(returnData);
    }
  } catch (error) {
    logger.error(`SARS SAVE ERROR : ${error}`);
    logger.error(JSON.stringify(param));
    currentTime = moment().format('YYYYMMDDHHmmssSSS');
    let returnData = {
      resCode: '9999',
      resMsg: 'SARS SAVE ERROR',
      resDttm: currentTime,
    };
    res.json(returnData);
  }
}));
// router.post('/config/biz/sync', ApiAction(async (req, res, next) => {
//   const result = await HanabizService.migrateDatabaseManually(req.body);
//   res.json(result);
// }));

module.exports = router;