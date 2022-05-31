const { param } = require('../../routes/api');

const CommonHanabank = require('./common/CommonHanabank');
const iconv = new require('iconv-lite');
const utils = require(global._resolve('/common/utils'));
const logger = require(global._resolve('/modules/winston')).logger;

module.exports = class SendKakaoTalkQ extends CommonHanabank {
  constructor(params) {
    super();
    // message code: SUMSM01KA502
    // 필요한 params 받아서 해당하는 멤버 변수에 할당

    if (process.env.ADD_STD_TMSG_SEQ_NO == '99999') {
      process.env.ADD_STD_TMSG_SEQ_NO = '1';
    } else {
      process.env.ADD_STD_TMSG_SEQ_NO = parseInt(process.env.ADD_STD_TMSG_SEQ_NO) + 1;
    }

    this.messageType = this.constructor.name;
    this.messageCode = 'SUMSM01KA502';

    // 시작
    this.STR_DV_CD = '';

    // UMS 헤더
    this.TMSG_LEN = '00000000';
    this.USM_MSG_DV_CD = 'A';
    this.RQST_DV_CD = '1';
    this.TMSG_SNRE_DRCT_DV_CD = 'S';
    this.TMSG_ORGN_DT = '';
    this.TMSG_ORGN_TM = '';
    this.UMS_SVC_CD = 'T2CCC00004';
    this.RQST_TMSG_NO = '';
    this.SYS_YN = 'P';
    this.RECV_TMSG_NO = '';

    this.USER_ID = '00000000000000000000';
    this.BUSS_BR_NO = '1209';
    this.DEPT_DV_CD = '';
    this.PROC_RSLT_DV_CD = '';
    this.PROC_RSLT_CD = '';
    this.PROC_RSLT_MSG = '';
    this.ACPN_DT = '';
    this.ACPN_DRTM = '';
    this.MSG_CLAS_CD = '';
    this.BIZ_SYS_DV_CD = 'CWM';

    this.SNDG_BIZ_DIV_CD = 'CCC';
    this.UNFY_CNTCT_ORI_DV_CD = '';
    this.TMSG_RSEV_CTT = '';

    // 채널헤더
    this.MSG_KIND_CD = 'P';
    this.VALD_TRM_SEC_CNT = '';
    this.IMDT_PROC_DV_CD = '1';
    this.RSV_DT = '';
    this.RSV_TM = '';
    this.SD_TCNT = '';
    this.SNDG_PRVW_YN = '0';

    // 데이터
    this.SMS_RPLY_NO = '15991111';
    this.MSG_TITLE = '[하나은행]';
    this.UMS_TMPL_ID = '20220330000106';
    this.RQST_TMSG_NO2 = '';
    this.CHR_MSG_CTT = `|^||^||^||^||^||^||^||^||^||^|${param.slinkUrl}|^||^||^||^||^||^||^||^||^||^||^||^||^||^||^||^||^||^||^||^|`;
    this.MSGR_SWT_TYP_CD = 'L';
    this.MSGR_SWT_SVC_CD = 'L2CCC00013';
    this.MSGR_SWT_MSG_CTT = '';
    this.MSGR_PFL_KEY = 'f744a1a8202c72c3170b30047e6ebed8dcc6462c';
    this.MSGR_BUTN_CTT = '';

    this.MSGR_IMG_LNK_CTT = '';
    this.MDA_FILE_CTT1 = '';
    this.MDA_FILE_CTT2 = '';
    this.MDA_FILE_CTT3 = '';
    this.GRID2_ROWCOUNT = '001';

    // 반복 ?
    this.SNDG_TMSG_NO = 'OOOO';
    this.RCPN_CUST_NM = '';
    this.CUST_NO = '';
    this.ACCT_NO = '';
    this.RCPN_MVNL_TEL_NO = String(param.ani);
    this.CHNL_ACPN_RSLT_TYP_CD = '';
    this.CHNL_ACPN_RSLT_CD = '';
    this.CHNL_ACPN_MSG = '';

    // 종료
    this.END_DV_CD = '';
  }

  makeRequestBody() {
    const body = paddingByteLen(this.STR_DV_CD, 1) // 시작
     + paddingByteLen(this.TMSG_LEN, 8) // UMS 헤더 시작,
     + paddingByteLen(this.USM_MSG_DV_CD, 1)
     + paddingByteLen(this.RQST_DV_CD, 1)
     + paddingByteLen(this.TMSG_SNRE_DRCT_DV_CD, 1)
     + paddingByteLen(this.TMSG_ORGN_DT, 8)
     + paddingByteLen(this.TMSG_ORGN_TM, 6)
     + paddingByteLen(this.UMS_SVC_CD, 10)
     + paddingByteLen(this.RQST_TMSG_NO, 20)
     + paddingByteLen(this.SYS_YN, 1)
     + paddingByteLen(this.RECV_TMSG_NO, 20)
     + paddingByteLen(this.USER_ID, 20)
     + paddingByteLen(this.BUSS_BR_NO, 10)
     + paddingByteLen(this.DEPT_DV_CD, 10)
     + paddingByteLen(this.PROC_RSLT_DV_CD, 1)
     + paddingByteLen(this.PROC_RSLT_CD, 4)
     + paddingByteLen(this.PROC_RSLT_MSG, 40)
     + paddingByteLen(this.ACPN_DT, 8)
     + paddingByteLen(this.ACPN_DRTM, 6)
     + paddingByteLen(this.MSG_CLAS_CD, 1)
     + paddingByteLen(this.BIZ_SYS_DV_CD, 10)
     + paddingByteLen(this.SNDG_BIZ_DIV_CD, 10)
     + paddingByteLen(this.UNFY_CNTCT_ORI_DV_CD, 2)
     + paddingByteLen(this.TMSG_RSEV_CTT, 26)
     + paddingByteLen(this.MSG_KIND_CD, 1) // 채널헤더
     + paddingByteLen(this.VALD_TRM_SEC_CNT, 10)
     + paddingByteLen(this.IMDT_PROC_DV_CD, 1)
     + paddingByteLen(this.RSV_DT, 8)
     + paddingByteLen(this.RSV_TM, 6)
     + paddingByteLen(this.SD_TCNT, 5)
     + paddingByteLen(this.SNDG_PRVW_YN, 1)
     + paddingByteLen(this.SMS_RPLY_NO, 20); // 데이터

    const buf1 = Buffer.alloc(277);
    const header = iconv.encode(body2, 'euc-kr');
    header.copy(buf1, 0, 0, header.length);

    const buf2 = Buffer.alloc(40);
    const title = iconv.encode(this.MSG_TITLE, 'euc-kr');
    title.copy(buf1, 0, 0, title.length);

    const buf3 = Buffer.alloc(20);
    const umsTmplId = iconv.encode(this.UMS_TMPL_ID, 'euc-kr');
    umsTmplId.copy(buf1, 0, 0, umsTmplId.length);

    const buf4 = Buffer.alloc(20);
    const rqstTmsgNo2 = iconv.encode(this.RQST_TMSG_NO2, 'euc-kr');
    rqstTmsgNo2.copy(buf1, 0, 0, rqstTmsgNo2.length);

    const buf5 = Buffer.alloc(2000);
    const chrMsgCtt = iconv.encode(this.CHR_MSG_CTT, 'euc-kr');
    chrMsgCtt.copy(buf1, 0, 0, chrMsgCtt.length);

    const body4 = paddingByteLen(this.MSG_TITLE, 40)
     + paddingByteLen(this.UMS_TMPL_ID, 20)
     + paddingByteLen(this.RQST_TMSG_NO2, 20)
     + paddingByteLen(this.CHR_MSG_CTT, 2000)
     + paddingByteLen(this.MSGR_SWT_TYP_CD, 1)
     + paddingByteLen(this.MSGR_SWT_SVC_CD, 10)
     + paddingByteLen(this.MSGR_SWT_MSG_CTT, 2000)
     + paddingByteLen(this.MSGR_PFL_KEY, 40)
     + paddingByteLen(this.MSGR_BUTN_CTT, 2000)
     + paddingByteLen(this.MSGR_IMG_LNK_CTT, 100)
     + paddingByteLen(this.MDA_FILE_CTT1, 100)
     + paddingByteLen(this.MDA_FILE_CTT2, 100)
     + paddingByteLen(this.MDA_FILE_CTT3, 100)
     + paddingByteLen(this.GRID2_ROWCOUNT, 3)
     + paddingByteLen(this.SNDG_TMSG_NO, 20) // 반복
     + paddingByteLen(this.RCPN_CUST_NM, 50)
     + paddingByteLen(this.CUST_NO, 9)
     + paddingByteLen(this.ACCT_NO, 20)
     + paddingByteLen(this.RCPN_MVNL_TEL_NO, 15)
     + paddingByteLen(this.CHNL_ACPN_RSLT_TYP_CD, 1)
     + paddingByteLen(this.CHNL_ACPN_RSLT_CD, 4)
     + paddingByteLen(this.CHNL_ACPN_MSG, 40)
     + paddingByteLen(this.END_DV_CD, 1); // 종료

    const buf6 = Buffer.alloc(4614);
    const end = iconv.encode(body4, 'euc-kr');
    end.copy(buf6, 0, 0, end.length);

    const messageBuffer = Buffer.concat([buf1, buf2, buf3, buf4, buf5, buf6]);

    const length1 = iconv.encode(paddingByteLenZero(String(messageBuffer.length), 8), 'EUC-KR');
    length1.copy(messageBuffer, 1, 0, length1.length);
    messageBuffer[0] = 0x02;

    return messageBuffer;
  }

  UmsprintRequestMessageLog() {
    const messageLog = `${this.getHeaderLog()}

    [데이터 부]
    =====================================================================
    [${this.descPad('시작구분코드')}][${this.namePad('STR_DV_CD')}][${this.numPad(1)}][${this.STR_DV_CD.padding(1)}]

    [${this.descPad('전문길이')}][${this.namePad('TMSG_LEN')}][${this.numPad(8)}][${this.TMSG_LEN.toString().padding(8, false, '0')}]
    [${this.descPad('UMS메시지구분코드')}][${this.namePad('USM_MSG_DV_CD')}][${this.numPad(1)}][${this.USM_MSG_DV_CD.padding(1)}]
    [${this.descPad('요청구분코드')}][${this.namePad('RQST_DV_CD')}][${this.numPad(1)}][${this.RQST_DV_CD.padding(1)}]
    [${this.descPad('전문송수신방향구분코드')}][${this.namePad('TMSG_SNRE_DRCT_DV_CD')}][${this.numPad(1)}][${this.TMSG_SNRE_DRCT_DV_CD.padding(1)}]
    [${this.descPad('전문발생일자')}][${this.namePad('TMSG_ORGN_DT')}][${this.numPad(8)}][${this.TMSG_ORGN_DT.padding(8)}]
    [${this.descPad('전문발생시각')}][${this.namePad('TMSG_ORGN_TM')}][${this.numPad(6)}][${this.TMSG_ORGN_TM.padding(6)}]
    [${this.descPad('서비스코드')}][${this.namePad('UMS_SVC_CD')}][${this.numPad(10)}][${this.UMS_SVC_CD.padding(10)}]
    [${this.descPad('요청전문번호')}][${this.namePad('RQST_TMSG_NO')}][${this.numPad(20)}][${this.RQST_TMSG_NO.padding(20)}]
    [${this.descPad('시스템여부')}][${this.namePad('SYS_YN')}][${this.numPad(1)}][${this.SYS_YN.padding(1)}]
    [${this.descPad('수신전문번호')}][${this.namePad('RECV_TMSG_NO')}][${this.numPad(20)}][${this.RECV_TMSG_NO.padding(20)}]
    
    [${this.descPad('사용자ID')}][${this.namePad('USER_ID')}][${this.numPad(20)}][${this.USER_ID.padding(20)}]
    [${this.descPad('영업점번호')}][${this.namePad('BUSS_BR_NO')}][${this.numPad(10)}][${this.BUSS_BR_NO.padding(10)}]
    [${this.descPad('부서구분코드')}][${this.namePad('DEPT_DV_CD')}][${this.numPad(10)}][${this.DEPT_DV_CD.padding(10)}]
    [${this.descPad('접수결과구분코드')}][${this.namePad('PROC_RSLT_DV_CD')}][${this.numPad(1)}][${this.PROC_RSLT_DV_CD.padding(1)}]
    [${this.descPad('접수결과코드')}][${this.namePad('PROC_RSLT_CD')}][${this.numPad(4)}][${this.PROC_RSLT_CD.padding(4)}]
    [${this.descPad('접수결과메시지')}][${this.namePad('PROC_RSLT_MSG')}][${this.numPad(40)}][${this.PROC_RSLT_MSG.padding(40)}]
    [${this.descPad('접수일자')}][${this.namePad('ACPN_DT')}][${this.numPad(8)}][${this.ACPN_DT.padding(8)}]
    [${this.descPad('접수시간')}][${this.namePad('ACPN_DRTM')}][${this.numPad(6)}][${this.ACPN_DRTM.padding(6)}]
    [${this.descPad('메시지분류코드')}][${this.namePad('MSG_CLAS_CD')}][${this.numPad(1)}][${this.MSG_CLAS_CD.padding(1)}]
    [${this.descPad('업무시스템구분코드')}][${this.namePad('BIZ_SYS_DV_CD')}][${this.numPad(10)}][${this.BIZ_SYS_DV_CD.padding(10)}]

    [${this.descPad('발송업무구분코드')}][${this.namePad('SNDG_BIZ_DIV_CD')}][${this.numPad(10)}][${this.SNDG_BIZ_DIV_CD.padding(10)}]
    [${this.descPad('통합접촉원천구분코드')}][${this.namePad('UNFY_CNTCT_ORI_DV_CD')}][${this.numPad(2)}][${this.UNFY_CNTCT_ORI_DV_CD.padding(2)}]
    [${this.descPad('전문예비내용')}][${this.namePad('TMSG_RSEV_CTT')}][${this.numPad(26)}][${this.TMSG_RSEV_CTT.padding(26)}]
    
    [${this.descPad('메시지종류코드')}][${this.namePad('MSG_KIND_CD')}][${this.numPad(1)}][${this.MSG_KIND_CD.padding(1)}]
    [${this.descPad('유효기간초수')}][${this.namePad('VALD_TRM_SEC_CNT')}][${this.numPad(10)}][${this.VALD_TRM_SEC_CNT.toString().padding(10, false, '0')}]
    [${this.descPad('즉시처리구분코드')}][${this.namePad('IMDT_PROC_DV_CD')}][${this.numPad(1)}][${this.IMDT_PROC_DV_CD.padding(1)}]
    [${this.descPad('예약일자')}][${this.namePad('RSV_DT')}][${this.numPad(8)}][${this.RSV_DT.padding(8)}]
    [${this.descPad('예약시각')}][${this.namePad('RSV_TM')}][${this.numPad(6)}][${this.RSV_TM.padding(6)}]
    [${this.descPad('시도회수')}][${this.namePad('SD_TCNT')}][${this.numPad(5)}][${this.SD_TCNT.toString().padding(5, false, '0')}]
    [${this.descPad('발송미리보기코드')}][${this.namePad('SNDG_PRVW_YN')}][${this.numPad(1)}][${this.SNDG_PRVW_YN.padding(1)}]
    
    [${this.descPad('회신번호')}][${this.namePad('SMS_RPLY_NO')}][${this.numPad(20)}][${this.SMS_RPLY_NO.padding(20)}]
    [${this.descPad('메시지제목')}][${this.namePad('MSG_TITLE')}][${this.numPad(40)}][${this.MSG_TITLE.padding(40)}]
    [${this.descPad('컨텐츠아이디')}][${this.namePad('UMS_TMPL_ID')}][${this.numPad(20)}][${this.UMS_TMPL_ID.padding(20)}]
    [${this.descPad('로컬KEY2')}][${this.namePad('RQST_TMSG_NO2')}][${this.numPad(20)}][${this.RQST_TMSG_NO2.padding(20)}]
    [${this.descPad('문자메시지내용')}][${this.namePad('CHR_MSG_CTT')}][${this.numPad(2000)}][${this.CHR_MSG_CTT.padding(2000)}]
    [${this.descPad('전환전송타입')}][${this.namePad('MSGR_SWT_TYP_CD')}][${this.numPad(1)}][${this.MSGR_SWT_TYP_CD.padding(1)}]
    [${this.descPad('전환전송서비스코드')}][${this.namePad('MSGR_SWT_SVC_CD')}][${this.numPad(10)}][${this.MSGR_SWT_SVC_CD.padding(10)}]
    [${this.descPad('전환전송메시지내용')}][${this.namePad('MSGR_SWT_MSG_CTT')}][${this.numPad(2000)}][${this.MSGR_SWT_MSG_CTT.padding(2000)}]
    [${this.descPad('카카오톡프로필KEY')}][${this.namePad('MSGR_PFL_KEY')}][${this.numPad(40)}][${this.MSGR_PFL_KEY.padding(40)}]
    [${this.descPad('카톡버튼내용')}][${this.namePad('MSGR_BUTN_CTT')}][${this.numPad(2000)}][${this.MSGR_BUTN_CTT.padding(2000)}]

    [${this.descPad('카톡이미지링크')}][${this.namePad('MSGR_IMG_LNK_CTT')}][${this.numPad(100)}][${this.MSGR_IMG_LNK_CTT.padding(100)}]
    [${this.descPad('1번째첨부파일명')}][${this.namePad('MDA_FILE_CTT1')}][${this.numPad(100)}][${this.MDA_FILE_CTT1.padding(100)}]
    [${this.descPad('2번째첨부파일명')}][${this.namePad('MDA_FILE_CTT2')}][${this.numPad(100)}][${this.MDA_FILE_CTT2.padding(100)}]
    [${this.descPad('3번째첨부파일명')}][${this.namePad('MDA_FILE_CTT3')}][${this.numPad(100)}][${this.MDA_FILE_CTT3.padding(100)}]
    [${this.descPad('자료건수')}][${this.namePad('GRID2_ROWCOUNT')}][${this.numPad(3)}][${this.GRID2_ROWCOUNT.toString().padding(3, false, '0')}]
    
    [${this.descPad('발송전문번호')}][${this.namePad('SNDG_TMSG_NO')}][${this.numPad(20)}][${this.SNDG_TMSG_NO.padding(20)}]
    [${this.descPad('수신인고객명')}][${this.namePad('RCPN_CUST_NM')}][${this.numPad(50)}][${this.RCPN_CUST_NM.padding(50)}]
    [${this.descPad('고객번호')}][${this.namePad('CUST_NO')}][${this.numPad(9)}][${this.CUST_NO.padding(9)}]
    [${this.descPad('계좌번호')}][${this.namePad('ACCT_NO')}][${this.numPad(20)}][${this.ACCT_NO.padding(20)}]
    [${this.descPad('수신인이동전화번호')}][${this.namePad('RCPN_MVNL_TEL_NO')}][${this.numPad(15)}][${this.RCPN_MVNL_TEL_NO.padding(15)}]
    [${this.descPad('채널접수결과유형코드')}][${this.namePad('CHNL_ACPN_RSLT_TYP_CD')}][${this.numPad(1)}][${this.CHNL_ACPN_RSLT_TYP_CD.padding(1)}]
    [${this.descPad('채널접수코드')}][${this.namePad('CHNL_ACPN_RSLT_CD')}][${this.numPad(4)}][${this.CHNL_ACPN_RSLT_CD.padding(4)}]
    [${this.descPad('채널접수메세지')}][${this.namePad('CHNL_ACPN_MSG')}][${this.numPad(40)}][${this.CHNL_ACPN_MSG.padding(40)}]
    [${this.descPad('종료구분코드')}][${this.namePad('END_DV_CD')}][${this.numPad(1)}][${this.END_DV_CD.padding(1)}]
    `;

    logger.info(messageLog);
  }
};

function paddingByteLen(str, maxbyte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.padding(maxbyte);
}

function paddingByteLenZero(str, maxbyte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.padding(maxbyte, false, '0');
}