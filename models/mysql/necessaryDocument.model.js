const models = require('.').models;
const sequelizeInstance = require('./').sequelize;

const moment = require('moment');
const { INTEGER, where } = require('sequelize');

const sequelize = require('sequelize');
const messagesNecessaryDocumentRepositoryPriorityDate = require('../../messages/server/response/HanaNecessaryDocumentRepositoryPriorityDate');
const Op = sequelize.Op;

/* ===================================================
 * NecessaryDocument
 * =================================================== */

exports.deleteNecessaryDocumentAll = async () => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const destoryResult = await models.HanaNecessaryDocument.destory({
      where: {},
      force: true,
      transaction: t,
    });
    return destoryResult;
  });
  return result;
};

exports.createBulkNecessaryDocument = async (list) => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const hanaNecessaryDocument = await models.HanaNecessaryDocument.bulkCreate(list, { transaction: t });
    return hanaNecessaryDocument;
  });
};

// 필요서류 전체 리스트 - 안병은
exports.getNecessaryDocumentList = async (params) => {
  const result = await models.HanaNecessaryDocument.findAll({
    where: {
      NCSY_DCMT_DV_CD: params.groupCd,
    },
  });
  return result;
};

// 특정서류 리스트
exports.getTargetDocumentList = async (params) => {
  let currentStep = parseInt(params.currentStep);
  let targetStep = currentStep + 1;
  let returnData;
  let whereTest = {
    NCSY_DCMTS: { [Op.not]: null },
    NCSY_DCMT_DV_CD: params.groupCd,
  };
  for (let i = 1; i <= currentStep; i++) {
    whereTest[`STEP_${i}_CD`] = params[`bizStep${i}Cd`];
  }

  const result = await models.HanaNecessaryDocument.findAll({
    where: whereTest,
  });

  const messagesTargetDocumentResponse = require('../../messages/server/response/HanaNecessaryDocumentResponse');
  const responseData = result.map(res => new messagesTargetDocumentResponse(res));

  if (responseData.length > 1) {
    const result2 = await models.HanaNecessaryDocument.findAll({
      where: whereTest,
      group: [
        [`STEP_${targetStep}CD`],
      ],
    });

    const responseData2 = result2.map(res => new messagesTargetDocumentResponse(res));

    let depthData = [];

    let dataLength = parseInt(responseData2.length) - 1;
    let targetDepth = parseInt(params.currentStep) + 1;

    for (let j = 0; j <= dataLength; j++) {
      let necessaryDocumentInfo = {};

      necessaryDocumentInfo['group'] = responseData2[j].ncsyDcmtDvCd;
      necessaryDocumentInfo['code'] = responseData2[j][`step${targetDepth}Cd`];
      necessaryDocumentInfo['name'] = responseData2[j][`step${targetDepth}Nm`];
      necessaryDocumentInfo['order'] = responseData2[j].bizSeqNo;

      depthData.push(necessaryDocumentInfo);
    }

    returnData = {
      type: 'D',
      biz: [{
        biStep1Cd: '',
        biStep2Cd: '',
        biStep3Cd: '',
        biStep4Cd: '',
        biStep5Cd: '',
        biStep6Cd: '',
        biStep1Nm: '',
        biStep2Nm: '',
        biStep3Nm: '',
        biStep4Nm: '',
        biStep5Nm: '',
        biStep6Nm: '',
        ncsyDcmts: '',
        gudSntcCttsN: '',
        addDcmtCtt: '',
        ncsyDcmtGudCtt: '',
      }],
      depth: depthData,
    };
  } else {
    const responseData = result.map(res => new messagesTargetDocumentResponse(res));

    returnData = {
      type: 'B',
      biz: [{
        biStep1Cd: responseData[0].biStep1Cd,
        biStep2Cd: responseData[0].biStep2Cd,
        biStep3Cd: responseData[0].biStep3Cd,
        biStep4Cd: responseData[0].biStep4Cd,
        biStep5Cd: responseData[0].biStep5Cd,
        biStep6Cd: responseData[0].biStep6Cd,
        biStep1Nm: responseData[0].biStep1Nm,
        biStep2Nm: responseData[0].biStep2Nm,
        biStep3Nm: responseData[0].biStep3Nm,
        biStep4Nm: responseData[0].biStep4Nm,
        biStep5Nm: responseData[0].biStep5Nm,
        biStep6Nm: responseData[0].biStep6Nm,
        ncsyDcmts: responseData[0].ncsyDcmts,
        gudSntcCttsN: responseData[0].gudSntcCttsN,
        addDcmtCtt: responseData[0].addDcmtCtt,
        ncsyDcmtGudCtt: responseData[0].ncsyDcmtGudCtt,
      }],
      depth: [{}],
    };
  }

  return returnData;
};

exports.getShareInfoDocumentList = async (params) => {
  let result;

  if (params.svcType == 'DL') {
    result = await models.HanaNecessaryDocumentHist.findall({
      where: {
        shareKey: params.shareKey,
        shareYn: 'Y',
      },
      order: [['startTime', 'DESC']],
      limit: 1,
    });

    let ShareInfoDocumentListParam = result.map(res => res.dataValues);

    let step1Cd = ShareInfoDocumentListParam[0].bizStep1Cd;
    let step2Cd = ShareInfoDocumentListParam[0].bizStep2Cd;
    let step3Cd = ShareInfoDocumentListParam[0].bizStep3Cd;
    let step4Cd = ShareInfoDocumentListParam[0].bizStep4Cd;
    let step5Cd = ShareInfoDocumentListParam[0].bizStep5Cd;
    let step6Cd = ShareInfoDocumentListParam[0].bizStep6Cd;

    const dl_List_result = await models.HanaNecessaryDocument.findAll({
      where: {
        NCSY_DCMTS_DV_CD: '001',
        STEP_1_CD: step1Cd,
        STEP_2_CD: step2Cd,
        STEP_3_CD: step3Cd,
        STEP_4_CD: step4Cd,
        STEP_5_CD: step5Cd,
        STEP_6_CD: step6Cd,
      },
    });

    const ShareInfoResult = dl_List_result.map(res => res.dataValues);

    const test = {
      lastBizStep: '',
      bizStep1Cd: ShareInfoResult[0].step1Cd,
      bizStep2Cd: ShareInfoResult[0].step2Cd,
      bizStep3Cd: ShareInfoResult[0].step3Cd,
      bizStep4Cd: ShareInfoResult[0].step4Cd,
      bizStep5Cd: ShareInfoResult[0].step5Cd,
      bizStep6Cd: ShareInfoResult[0].step6Cd,
      ncsyDcmts: ShareInfoResult[0].ncsyDcmts,
      gudSntcCttsN: ShareInfoResult[0].gudSntcCttsN,
      addDcmtCtt: ShareInfoResult[0].addDcmtCtt,
      ncsyDcmtGudCtt: ShareInfoResult[0].ncsyDcmtGudCtt,
    };

    ShareInfoDocumentListParam[0].biz = test;
    result = ShareInfoDocumentListParam;
    return result;
  }

  if (params.svcType == 'BL') {
    result = await models.HanaBranchHist.findAll({
      where: {
        shareKey: params.shareKey,
        shareYn: 'Y',
      },
      order: [['startTime', 'DESC']],
      limit: 1,
    });
  }
};

exports.deleteNecessaryDocumentAll = async () => {
  const result = await sequelizeInstance.transaction(async (t) => {
    const destroyResult = await models.HanaNecessaryDocument.destroy({
      where: {},
      force: true,
      transaction: t,
    });
    return destroyResult;
  });
  return result;
};

/* ===================================================
 * NecessaryDocumentPriority
 * =================================================== */

exports.createBulkNecessaryDocumentPriority = async (list) => {
  const result = await models.NecessaryDocumentPriority.bulkCreate(list);
  return result;
};

// 우선순위 필요서류 조회- 안병은
exports.getNecessaryDocumentPriorityList = async (params) => {
  const PriorityDateResult = await models.HanaNecessaryDocumentPriorityDate.findAll({
    where: {
      VIEWCHECK: '1',
    },
  });

  // const PriorityDateResultParam = PriorityDateResult.map(res => res.CONF_TYPE);

  const PriorityDateResultParam = PriorityDateResult.map(res => res.dataValues);

  // 자동이냐 수동이냐
  // 자동이면 바로 우선순위 조회
  // 수동이면 시작, 종료날짜 시간 비교 후 in이면 수동 조회 out이면 자동조회
  const currentTime = moment().format('YYYYMMDD');

  let PriorityContType = PriorityDateResultParam[0].contType;
  let PriorityStartDate = PriorityDateResultParam[0].startDate;
  let PriorityEndDate = PriorityDateResultParam[0].endDate;

  let result;

  if (PriorityContType == 'MA') {
    if (PriorityStartDate < currentTime && currentTime < PriorityEndDate) {
      result = await models.HanaNecessaryDocumentPriority.findAll({
        where: {
          confType: PriorityContType,
        },
      });
    } else {
      PriorityContType = 'AU';
      result = await models.HanaNecessaryDocumentPriority.findAll({
        where: {
          confType: PriorityContType,
        },
      });
    }
  } else { // CONTTYPE이 AU일때
    result = await models.HanaNecessaryDocumentPriority.findAll({
      where: {
        confType: PriorityContType,
      },
    });
  }
  return result;
};

/* ===================================================
 * NecessaryDocumentPriorityDate
 * =================================================== */

exports.createNecessaryDocumentPriorityDate = async (params) => {
  const result = await models.NecessaryDocumentPriorityDate.create({
    confType: params.confType,
    chType: params.chType,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  return result;
};