const moment = require('moment');
const utils = require(global._resolve('/common/utils'));
const iconv = new require('iconv-lite');

module.exports = class CommonHanabank {
  constructor() {
    const current = moment();

    // system header
    this.STD_TMSG_LEN = '00000000';
    this.CRYP_DV_CD = '0'; // 고정?
    this.TMSG_WRTG_DT = current.format('YYYYMMDD');
    this.TMSG_CRE_SYS_NM = process.env.MCI_SYSTEM_NAME;
    this.STD_TMSG_SEQ_NO = `${current.format('HHmmssSSS')}${process.env.ADD_STD_TMSG_SEQ_NO.padStart(5, '0')}`; // TODO: 영업점, UMS 일련번호 확인 필요
    this.STD_TMSG_PRGR_NO = '00'; // TODO: 확인 필요
    this.IPV6_ADR = process.env.MCI_SENDER_HOST;
    this.TMSG_MAC_ADR = process.env.MCI_SENDER_MAC_ADDRESS;
    this.ENVR_INFO_DV_CD = process.env.MCI_ENV;
    this.FST_TRMS_SYS_CD = process.env.MCI_SENDER_SYSTEM_CODE;
    this.TRMS_SYS_CD = 'CBS';
    this.TRMS_ND_NO = '0000'; // 고정?
    this.XA_TRSC_DV_CD = '0'; // 고정?
    this.RQST_RSPS_DV_CD = 'Q'; // 요청 Q, 응답 S
    this.TRSC_SYNC_DV_CD = 'S'; // Sync, 고정?
    this.TMSG_RQST_DTM = current.format('YYYYMMDDHHmmssSS'); // 포맷 확인
    this.TTL_USE_DV_CD = '0'; // 고정?
    this.FST_STR_DRTM = current.format('HHmmss');
    this.MTN_DRTM_SEC_CNT = '000'; // 고정?
    // this.RECV_SVC_CD = ''; // 각 message(영업점 조회, 카카오톡 발송)에서 정의 (messageCode)
    this.RSLT_RECV_SVC_CD = '';

    this.EAI_INTF_ID = '';
    this.TMSG_RSPS_DTM = ''; // 요청시 사용 안함
    this.PROC_RSLT_DV_CD = ''; // 요청시 사용 안함
    this.PRN_TMSG_TYP_CD = '1'; // 1: 일반 거래 전문, 고정? // 요청시 사용 안함
    this.TMSG_CNTN_SEQ_NO = '00'; // 확인 필요 // 요청시 사용 안함
    this.DSBL_SYS_CD = ''; // 요청시 사용 안함
    this.STD_TMSG_ERR_CD = ''; // 요청시 사용 안함
    this.TMSG_VER_DV_CD = 'R11'; // 고정?
    this.LNGG_DV_CD = 'KR'; // 고정?
    this.CHNL_TYP_CD = process.env.MCI_CHANNEL_TYPE_CODE;

    this.MCA_ND_NO = '00'; // 확인 필요
    this.MCA_SESS_ID_NO = '';
    this.SESS_ID_NO = '000'; // 확인 필요
    this.TRSC_KIND_CD = 'TCO'; // 고정?, 거래 종류 코드 확인 필요
    this.EXTN_CRCT_NO = '';
    this.FST_TRMS_SYS_PORT_NO = '';
    this.MCA_WAS_NM = '';
    this.SYS_RSEV_STRN_CTT = ''; // 사용하지 않음, 공백문자

    // transaction header
    this.TMSG_MSG_TYP_CD = '1';
    this.BIZ_BEG_YN = '';
    this.BLNG_CRCO_CD = '';
    this.BLNG_BR_NO = process.env.MCI_BELONGS_BRANCH_NO;
    this.BLNG_BRFC_CD = '';
    this.EMP_NO = '0000000';
    this.OFLV_CD = '';
    this.OFDY_CD = '';
    this.TRSC_GRCO_CD = process.env.MCI_TRANSACTION_GROUP_CODE;
    this.TRSC_BR_NO = process.env.MCI_TRANSACTION_BRANCH_NO;

    this.TRSC_BRFC_CD = '';
    this.TRSC_TML_NO = '';
    this.IST_BR_NO = '';
    this.APV_DV_CD = '';
    this.TI1_APPR_BLNG_GRCO_CD = '';
    this.TI1_APPR_EMP_NO = '';
    this.TI1_APPR_OFLV_CD = '';
    this.TI1_APPR_TML_NO = '';
    this.TI2_APPR_BLNG_GRCO_CD = '';
    this.TI2_APPR_EMP_NO = '';

    this.TI2_APPR_OFLV_CD = '';
    this.TI2_APPR_TML_NO = '';
    this.SCRN_ID = process.env.MCI_SCREEN_ID;
    this.SUB_SCRN_ID = '';
    this.PSBK_PRTR_CONN_DV_CD = '0';
    this.PSBK_DV_CD = '';
    this.CRD_DV_CD = '';
    this.SOHO_TML_DV_CD = '';
    this.CDPS_24_TRSC_DV_CD = '';
    this.SBCTR_MGNT_DV_CD = '';

    this.AC_RNW_MODE_DV_CD = '';
    this.SMLTN_TRSC_YN = '';
    this.EDMS_TRSC_YN = '';
    this.TST_DT = '';
    this.OTSD_INST_CD = '';
    this.OTSD_BIZ_CD = '';
    this.TMSG_PRN_LEN = '00000000';
    this.STRG_SYS_CD = '';
    this.LNK_SYS_CD = '';
    this.OFFCR_CD = '';

    this.OPRN_CD = '';
    this.TRSC_PTCL_CRE_YN = '';
    this.FST_TRMS_MDCL_CTT = '39'; // 확인 필요
    this.EDMS_CUTR_ELEC_DV_CD = '';
    this.SBST_DSCD_DV_CD = '';
    this.CERT_PROC_DV_CD = '';
    this.OVRS_BR_NO = '';
    this.TRSC_RSEV_STRN_CTT = '30'; // 확인 필요

    // data header
    this.STD_TMSG_DAT_KIND_CD = '10'; // 고정? 업무 입출력데이터
    this.dataLength = 0; // 데이터부 길이

    String.prototype.padding = utils.messagePadding;
  }

  getSystemHeader() {
    const systemHeader = this.CRYP_DV_CD.padding(1)
     + this.TMSG_WRTG_DT.padding(8)
     + this.TMSG_CRE_SYS_NM.padding(8)
     + this.STD_TMSG_SEQ_NO.padding(14)
     + this.STD_TMSG_PRGR_NO.padding(2)
     + this.IPV6_ADR.padding(39)
     + this.TMSG_MAC_ADR.padding(12)
     + this.ENVR_INFO_DV_CD.padding(1)
     + this.FST_TRMS_SYS_CD.padding(3)
     + this.TRMS_SYS_CD.padding(3)
     + this.TRMS_ND_NO.padStart(4, '0')
     + this.XA_TRSC_DV_CD.padding(1)
     + this.RQST_RSPS_DV_CD.padding(1)
     + this.TRSC_SYNC_DV_CD.padding(1)
     + this.TMSG_RQST_DTM.padding(16)
     + this.TTL_USE_DV_CD.padding(1)
     + this.FST_STR_DRTM.padding(6)
     + this.MTN_DRTM_SEC_CNT.padding(3)
     + this.messageCode.padding(12) // RECV_SVC_CD
     + this.RSLT_RECV_SVC_CD.padding(12)
     + this.EAI_INTF_ID.padding(16)
     + this.TMSG_RSPS_DTM.padding(16)
     + this.PROC_RSLT_DV_CD.padding(1)
     + this.PRN_TMSG_TYP_CD.padding(1)
     + this.TMSG_CNTN_SEQ_NO.padStart(2, '0')
     + this.DSBL_SYS_CD.padding(3)
     + this.STD_TMSG_ERR_CD.padding(9)
     + this.TMSG_VER_DV_CD.padding(3)
     + this.LNGG_DV_CD.padding(2)
     + this.CHNL_TYP_CD.padding(3)
     + this.MCA_ND_NO.padStart(2, '0')
     + this.MCA_SESS_ID_NO.padding(8)
     + this.SESS_ID_NO.padStart(3, '0')
     + this.TRSC_KIND_CD.padding(3)
     + this.EXTN_CRCT_NO.padding(10)
     + this.FST_TRMS_SYS_PORT_NO.toString().padding(5, '0')
     + this.MCA_WAS_NM.padding(2)
     + this.SYS_RSEV_STRN_CTT.padding(45);
    return systemHeader;
  }

  getTransactionHeader() {
    const transactionHeader = this.TMSG_MSG_TYP_CD.padding(1)
     + this.BIZ_BEG_YN.padding(1)
     + this.BLNG_CRCO_CD.padding(2)
     + this.BLNG_BR_NO.padding(4)
     + this.BLNG_BRFC_CD.padding(4)
     + this.EMP_NO.padding(7)
     + this.OFLV_CD.padding(3)
     + this.OFDY_CD.padding(3)
     + this.TRSC_GRCO_CD.padding(2)
     + this.TRSC_BR_NO.padding(4)
     + this.TRSC_BRFC_CD.padding(4)
     + this.TRSC_TML_NO.padding(4)
     + this.IST_BR_NO.padding(4)
     + this.APV_DV_CD.padding(1)
     + this.TI1_APPR_BLNG_GRCO_CD.padding(2)
     + this.TI1_APPR_EMP_NO.padding(7)
     + this.TI1_APPR_OFLV_CD.padding(3)
     + this.TI1_APPR_TML_NO.padding(4)
     + this.TI2_APPR_BLNG_GRCO_CD.padding(2)
     + this.TI2_APPR_EMP_NO.padding(7)
     + this.TI2_APPR_OFLV_CD.padding(3)
     + this.TI2_APPR_TML_NO.padding(4)
     + this.SCRN_ID.padding(9)
     + this.SUB_SCRN_ID.padding(9)
     + this.PSBK_PRTR_CONN_DV_CD.padding(1)
     + this.PSBK_DV_CD.padding(1)
     + this.CRD_DV_CD.padding(1)
     + this.SOHO_TML_DV_CD.padding(1)
     + this.CDPS_24_TRSC_DV_CD.padding(1)
     + this.SBCTR_MGNT_DV_CD.padding(1)
     + this.AC_RNW_MODE_DV_CD.padding(1)
     + this.SMLTN_TRSC_YN.padding(1)
     + this.EDMS_TRSC_YN.padding(1)
     + this.TST_DT.padding(8)
     + this.OTSD_INST_CD.padding(4)
     + this.OTSD_BIZ_CD.padding(3)
     + this.TMSG_PRN_LEN.padStart(8, '0')
     + this.STRG_SYS_CD.padding(3)
     + this.LNK_SYS_CD.padding(3)
     + this.OFFCR_CD.padding(8)
     + this.OPRN_CD.padding(4)
     + this.TRSC_PTCL_CRE_YN.padding(1)
     + this.FST_TRMS_MDCL_CTT.padding(39)
     + this.EDMS_CUTR_ELEC_DV_CD.padding(1)
     + this.SBST_DSCD_DV_CD.padding(1)
     + this.CERT_PROC_DV_CD.padding(2)
     + this.OVRS_BR_NO.padding(4)
     + this.TRSC_RSEV_STRN_CTT.padding(30);
    return transactionHeader;
  }

  getDataHeader(dataLength) {
    // TODO: byte length 인지 확인 필요 (문서에 명시되어있지 않음)
    // const dataLength = utils.getByteLength(data).toString().padStart(8, 0);
    const dataHeader = this.STD_TMSG_DAT_KIND_CD.padding(2) + paddingByteLenZero(String(dataLength - 10), 8);
    return dataHeader;
  }

  // request common method
  makeMessageHeader(data) {
    const systemHeader = this.getSystemHeader();
    const transactionHeader = this.getTransactionHeader();
    const dataHeader = this.getDataHeader(data);
    return `${systemHeader}${transactionHeader}${dataHeader}`;
  }

  descPad(desc) {
    return `${desc.padEnd(20)}\t`;
  }

  namePad(name) {
    return name.padEnd(24);
  }

  numPad(n) {
    return n.toString().padding(4, false);
  }

  getHeaderLog() {
    console.log(this.messageCode);
    return `
    [시스템 헤더부]
    =====================================================================
    [${this.descPad('암호화구분')}][${this.namePad('CRYP_DV_CD')}][${this.numPad(1)}][${this.CRYP_DV_CD.padding(1)}]
    [${this.descPad('전문작성일')}][${this.namePad('TMSG_WRTG_DT')}][${this.numPad(8)}][${this.TMSG_WRTG_DT.padding(8)}]
    [${this.descPad('전문생성시스템명')}][${this.namePad('TMSG_CRE_SYS_NM')}][${this.numPad(8)}][${this.TMSG_CRE_SYS_NM.padding(8)}]
    [${this.descPad('표준전문일련번호')}][${this.namePad('STD_TMSG_SEQ_NO')}][${this.numPad(14)}][${this.STD_TMSG_SEQ_NO.padding(14)}]
    [${this.descPad('표준전문진행번호')}][${this.namePad('STD_TMSG_PRGR_NO')}][${this.numPad(2)}][${this.STD_TMSG_PRGR_NO.toString().padding(2, false, '0')}]
    [${this.descPad('IPV6주소')}][${this.namePad('IPV6_ADR')}][${this.numPad(39)}][${this.IPV6_ADR.padding(39)}]
    [${this.descPad('MAC주소')}][${this.namePad('TMSG_MAC_ADR')}][${this.numPad(12)}][${this.TMSG_MAC_ADR.padding(12)}]
    [${this.descPad('환경정보')}][${this.namePad('ENVR_INFO_DV_CD')}][${this.numPad(1)}][${this.ENVR_INFO_DV_CD.padding(1)}]
    [${this.descPad('최초전송시스템코드')}][${this.namePad('FST_TRMS_SYS_CD')}][${this.numPad(3)}][${this.FST_TRMS_SYS_CD.padding(3)}]
    [${this.descPad('전송시스템코드')}][${this.namePad('TRMS_SYS_CD')}][${this.numPad(3)}][${this.TRMS_SYS_CD.padding(3)}]
    
    [${this.descPad('전송노드번호')}][${this.namePad('TRMS_ND_NO')}][${this.numPad(4)}][${this.TRMS_ND_NO.toString().padding(4, false, '0')}]
    [${this.descPad('XA거래번호')}][${this.namePad('XA_TRSC_DV_CD')}][${this.numPad(1)}][${this.XA_TRSC_DV_CD.padding(1)}]
    [${this.descPad('요청응답구분코드')}][${this.namePad('RQST_RSPS_DV_CD')}][${this.numPad(1)}][${this.RQST_RSPS_DV_CD.padding(1)}]
    [${this.descPad('거래동기화구분코드')}][${this.namePad('TRSC_SYNC_DV_CD')}][${this.numPad(1)}][${this.TRSC_SYNC_DV_CD.padding(1)}]
    [${this.descPad('전문요청일시')}][${this.namePad('TMSG_RQST_DTM')}][${this.numPad(16)}][${this.TMSG_RQST_DTM.padding(16)}]
    [${this.descPad('TTL사용구분코드')}][${this.namePad('TTL_USE_DV_CD')}][${this.numPad(1)}][${this.TTL_USE_DV_CD.padding(1)}]
    [${this.descPad('최초시작시간')}][${this.namePad('FST_STR_DRTM')}][${this.numPad(6)}][${this.FST_STR_DRTM.padding(6)}]
    [${this.descPad('유지시간초수')}][${this.namePad('MTN_DRTM_SEC_CNT')}][${this.numPad(3)}][${this.MTN_DRTM_SEC_CNT.toString().padding(3, false, '0')}]
    [${this.descPad('수신서비스코드(거래코드)')}][${this.namePad('RECV_SVC_CD')}][${this.numPad(12)}][${this.messageCode.padding(12)}]
    [${this.descPad('결과수신서비스코드')}][${this.namePad('RSLT_RECV_SVC_CD')}][${this.numPad(12)}][${this.RSLT_RECV_SVC_CD.padding(12)}]
    
    [${this.descPad('EAI인터페이스ID')}][${this.namePad('EAI_INTF_ID')}][${this.numPad(16)}][${this.EAI_INTF_ID.padding(16)}]
    [${this.descPad('전문응답일시')}][${this.namePad('TMSG_RSPS_DTM')}][${this.numPad(16)}][${this.TMSG_RSPS_DTM.padding(16)}]
    [${this.descPad('처리결과구분코드')}][${this.namePad('PROC_RSLT_DV_CD')}][${this.numPad(1)}][${this.PROC_RSLT_DV_CD.padding(1)}]
    [${this.descPad('출력전문유형코드')}][${this.namePad('PRN_TMSG_TYP_CD')}][${this.numPad(1)}][${this.PRN_TMSG_TYP_CD.padding(1)}]
    [${this.descPad('전문연속일련번호')}][${this.namePad('TMSG_CNTN_SEQ_NO')}][${this.numPad(2)}][${this.TMSG_CNTN_SEQ_NO.toString().padding(2, false, '0')}]
    [${this.descPad('장애시스템코드')}][${this.namePad('DSBL_SYS_CD')}][${this.numPad(3)}][${this.DSBL_SYS_CD.padding(3)}]
    [${this.descPad('표준전문오류코드')}][${this.namePad('STD_TMSG_ERR_CD')}][${this.numPad(9)}][${this.STD_TMSG_ERR_CD.padding(9)}]
    [${this.descPad('전문버전구분코드')}][${this.namePad('TMSG_VER_DV_CD')}][${this.numPad(3)}][${this.TMSG_VER_DV_CD.padding(3)}]
    [${this.descPad('언어구분코드')}][${this.namePad('LNGG_DV_CD')}][${this.numPad(2)}][${this.LNGG_DV_CD.padding(2)}]
    [${this.descPad('채널유형코드')}][${this.namePad('CHNL_TYP_CD')}][${this.numPad(3)}][${this.CHNL_TYP_CD.padding(3)}]
    
    [${this.descPad('MCA노드번호')}][${this.namePad('MCA_ND_NO')}][${this.numPad(2)}][${this.MCA_ND_NO.toString().padding(2, false, '0')}]
    [${this.descPad('MCA세션ID번호')}][${this.namePad('MCA_SESS_ID_NO')}][${this.numPad(8)}][${this.MCA_SESS_ID_NO.padding(8)}]
    [${this.descPad('세션ID번호')}][${this.namePad('SESS_ID_NO')}][${this.numPad(3)}][${this.SESS_ID_NO.toString().padding(3, false, '0')}]
    [${this.descPad('거래종류코드')}][${this.namePad('TRSC_KIND_CD')}][${this.numPad(3)}][${this.TRSC_KIND_CD.padding(3)}]
    [${this.descPad('외부회선번호')}][${this.namePad('EXTN_CRCT_NO')}][${this.numPad(10)}][${this.EXTN_CRCT_NO.padding(10)}]
    [${this.descPad('최초전송시스템포트번호')}][${this.namePad('FST_TRMS_SYS_PORT_NO')}][${this.numPad(5)}][${this.FST_TRMS_SYS_PORT_NO.toString().padding(5, false, '0')}]
    [${this.descPad('MCA WAS 명칭')}][${this.namePad('MCA_WAS_NM')}][${this.numPad(2)}][${this.MCA_WAS_NM.padding(2)}]
    [${this.descPad('시스템예비문자열내용')}][${this.namePad('SYS_RSEV_STRN_CTT')}][${this.numPad(45)}][${this.SYS_RSEV_STRN_CTT.padding(45)}]
    
    [거래 공통부]
    =====================================================================
    [${this.descPad('전문메시지유형코드')}][${this.namePad('TMSG_MSG_TYP_CD')}][${this.numPad(1)}][${this.TMSG_MSG_TYP_CD.padding(1)}]
    [${this.descPad('업무개시여부')}][${this.namePad('BIZ_BEG_YN')}][${this.numPad(1)}][${this.BIZ_BEG_YN.padding(1)}]
    [${this.descPad('소속그룹사코드')}][${this.namePad('BLNG_CRCO_CD')}][${this.numPad(2)}][${this.BLNG_CRCO_CD.padding(2)}]
    [${this.descPad('소속점번호')}][${this.namePad('BLNG_BR_NO')}][${this.numPad(4)}][${this.BLNG_BR_NO.padding(4)}]
    [${this.descPad('소속출장소코드')}][${this.namePad('BLNG_BRFC_CD')}][${this.numPad(4)}][${this.BLNG_BRFC_CD.padding(4)}]
    [${this.descPad('직원번호')}][${this.namePad('EMP_NO')}][${this.numPad(7)}][${this.EMP_NO.padding(7)}]
    [${this.descPad('직급코드')}][${this.namePad('OFLV_CD')}][${this.numPad(3)}][${this.OFLV_CD.padding(3)}]
    [${this.descPad('직무코드')}][${this.namePad('OFDY_CD')}][${this.numPad(3)}][${this.OFDY_CD.padding(3)}]
    [${this.descPad('거래그룹사코드')}][${this.namePad('TRSC_GRCO_CD')}][${this.numPad(2)}][${this.TRSC_GRCO_CD.padding(2)}]
    [${this.descPad('거래점번호')}][${this.namePad('TRSC_BR_NO')}][${this.numPad(4)}][${this.TRSC_BR_NO.padding(4)}]
    
    [${this.descPad('거래출장소코드')}][${this.namePad('TRSC_BRFC_CD')}][${this.numPad(4)}][${this.TRSC_BRFC_CD.padding(4)}]
    [${this.descPad('거래단말번호')}][${this.namePad('TRSC_TML_NO')}][${this.numPad(4)}][${this.TRSC_TML_NO.padding(4)}]
    [${this.descPad('설치점번호')}][${this.namePad('IST_BR_NO')}][${this.numPad(4)}][${this.IST_BR_NO.padding(4)}]
    [${this.descPad('승인구분코드')}][${this.namePad('APV_DV_CD')}][${this.numPad(1)}][${this.APV_DV_CD.padding(1)}]
    [${this.descPad('1차승인자소속그룹사코드')}][${this.namePad('TI1_APPR_BLNG_GRCO_CD')}][${this.numPad(2)}][${this.TI1_APPR_BLNG_GRCO_CD.padding(2)}]
    [${this.descPad('1차승인자직원번호')}][${this.namePad('TI1_APPR_EMP_NO')}][${this.numPad(7)}][${this.TI1_APPR_EMP_NO.padding(7)}]
    [${this.descPad('1차승인자직급코드')}][${this.namePad('TI1_APPR_OFLV_CD')}][${this.numPad(3)}][${this.TI1_APPR_OFLV_CD.padding(3)}]
    [${this.descPad('1차승인자단말번호')}][${this.namePad('TI1_APPR_TML_NO')}][${this.numPad(4)}][${this.TI1_APPR_TML_NO.padding(4)}]
    [${this.descPad('승인자2소속그룹사코드')}][${this.namePad('TI2_APPR_BLNG_GRCO_CD')}][${this.numPad(2)}][${this.TI2_APPR_BLNG_GRCO_CD.padding(2)}]
    [${this.descPad('승인자2직원번호')}][${this.namePad('TI2_APPR_EMP_NO')}][${this.numPad(7)}][${this.TI2_APPR_EMP_NO.padding(7)}]
    
    [${this.descPad('승인자2직급코드')}][${this.namePad('TI2_APPR_OFLV_CD')}][${this.numPad(3)}][${this.TI2_APPR_OFLV_CD.padding(3)}]
    [${this.descPad('승인자2단말번호')}][${this.namePad('TI2_APPR_TML_NO')}][${this.numPad(4)}][${this.TI2_APPR_TML_NO.padding(4)}]
    [${this.descPad('화면ID')}][${this.namePad('SCRN_ID')}][${this.numPad(9)}][${this.SCRN_ID.padding(9)}]
    [${this.descPad('하위화면ID')}][${this.namePad('SUB_SCRN_ID')}][${this.numPad(9)}][${this.SUB_SCRN_ID.padding(9)}]
    [${this.descPad('통장프린터접속구분코드')}][${this.namePad('PSBK_PRTR_CONN_DV_CD')}][${this.numPad(1)}][${this.PSBK_PRTR_CONN_DV_CD.padding(1)}]
    [${this.descPad('통장구분코드')}][${this.namePad('PSBK_DV_CD')}][${this.numPad(1)}][${this.PSBK_DV_CD.padding(1)}]
    [${this.descPad('카드구분코드')}][${this.namePad('CRD_DV_CD')}][${this.numPad(1)}][${this.CRD_DV_CD.padding(1)}]
    [${this.descPad('소호단말구분코드')}][${this.namePad('SOHO_TML_DV_CD')}][${this.numPad(1)}][${this.SOHO_TML_DV_CD.padding(1)}]
    [${this.descPad('CD24거래구분코드')}][${this.namePad('CDPS_24_TRSC_DV_CD')}][${this.numPad(1)}][${this.CDPS_24_TRSC_DV_CD.padding(1)}]
    [${this.descPad('외주관리구분코드')}][${this.namePad('SBCTR_MGNT_DV_CD')}][${this.numPad(1)}][${this.SBCTR_MGNT_DV_CD.padding(1)}]
    
    [${this.descPad('계정갱신모드구분코드')}][${this.namePad('AC_RNW_MODE_DV_CD')}][${this.numPad(1)}][${this.AC_RNW_MODE_DV_CD.padding(1)}]
    [${this.descPad('시뮬레이션거래여부')}][${this.namePad('SMLTN_TRSC_YN')}][${this.numPad(1)}][${this.SMLTN_TRSC_YN.padding(1)}]
    [${this.descPad('EDMS거래여부')}][${this.namePad('EDMS_TRSC_YN')}][${this.numPad(1)}][${this.EDMS_TRSC_YN.padding(1)}]
    [${this.descPad('테스트일자')}][${this.namePad('TST_DT')}][${this.numPad(8)}][${this.TST_DT.padding(8)}]
    [${this.descPad('대외거래코드')}][${this.namePad('OTSD_INST_CD')}][${this.numPad(4)}][${this.OTSD_INST_CD.padding(4)}]
    [${this.descPad('대외업무코드')}][${this.namePad('OTSD_BIZ_CD')}][${this.numPad(3)}][${this.OTSD_BIZ_CD.padding(3)}]
    [${this.descPad('전문출력길이')}][${this.namePad('TMSG_PRN_LEN')}][${this.numPad(8)}][${this.TMSG_PRN_LEN.toString().padding(8, false, '0')}]
    [${this.descPad('기동시스템코드')}][${this.namePad('STRG_SYS_CD')}][${this.numPad(3)}][${this.STRG_SYS_CD.padding(3)}]
    [${this.descPad('연계시스템코드')}][${this.namePad('LNK_SYS_CD')}][${this.numPad(3)}][${this.LNK_SYS_CD.padding(3)}]
    [${this.descPad('오피서코드')}][${this.namePad('OFFCR_CD')}][${this.numPad(8)}][${this.OFFCR_CD.padding(8)}]
    
    [${this.descPad('조작코드')}][${this.namePad('OPRN_CD')}][${this.numPad(4)}][${this.OPRN_CD.padding(4)}]
    [${this.descPad('거래내역생성여부')}][${this.namePad('TRSC_PTCL_CRE_YN')}][${this.numPad(1)}][${this.TRSC_PTCL_CRE_YN.padding(1)}]
    [${this.descPad('최초전송매체내용')}][${this.namePad('FST_TRMS_MDCL_CTT')}][${this.numPad(39)}][${this.FST_TRMS_MDCL_CTT.padding(39)}]
    [${this.descPad('EDMS창구전자구분코드')}][${this.namePad('EDMS_CUTR_ELEC_DV_CD')}][${this.numPad(1)}][${this.EDMS_CUTR_ELEC_DV_CD.padding(1)}]
    [${this.descPad('대체불일치구분코드')}][${this.namePad('SBST_DSCD_DV_CD')}][${this.numPad(1)}][${this.SBST_DSCD_DV_CD.padding(1)}]
    [${this.descPad('인증처리구분코드')}][${this.namePad('CERT_PROC_DV_CD')}][${this.numPad(2)}][${this.CERT_PROC_DV_CD.padding(2)}]
    [${this.descPad('해외점번호')}][${this.namePad('OVRS_BR_NO')}][${this.numPad(4)}][${this.OVRS_BR_NO.padding(4)}]
    [${this.descPad('거래예비문자열')}][${this.namePad('TRSC_RSEV_STRN_CTT')}][${this.numPad(30)}][${this.TRSC_RSEV_STRN_CTT.padding(30)}]

    [데이터 헤더부]
    =====================================================================
    [${this.descPad('데이터종류')}][${this.namePad('STD_TMSG_DAT_KIND_CD')}][${this.numPad(2)}][${this.STD_TMSG_DAT_KIND_CD.padding(2)}]
    [${this.descPad('데이터길이')}][${this.namePad('CHNL_TYP_CD')}][${this.numPad(8)}][${this.dataLength}]`;
  }

  // request common method
  make() {
    const messageBody = this.makeRequestBody();
    const messageHeader = this.makeMessageHeader(messageBody.length);
    const message = `${messageHeader}${messageBody}`; // '@@' 데이터 종료부

    // this.dataLength = messageBody.length.toString().padStart(8, 0);
    const length = utils.getByteLength(message).toString().padStart(8, 0); // leading-zero

    this.printRequestMessageLog();

    return `${length}${message}`;
  }

  makeUMSMessageHeader(data) {
    const systemHeader = this.getSystemHeader();

    const transactionHeader = this.getTransactionHeader();
    const dataHeader = this.getDataHeader(data);
    const length = paddingByteLenZero(String(`${systemHeader}${transactionHeader}${dataHeader}`.length - 8), 8);

    return `${length}${systemHeader}${transactionHeader}${dataHeader}`;
  }

  makeUMS() {
    const messageBody = this.makeRequestBody();
    const messageHeader = this.makeMessageHeader(messageBody.length - 10);
    // const message = `${messageHeader}${messageBody}`; // '@@' 데이터 종료부
    const endPoint = iconv.encdoe('@@', 'euc-kr');

    const messageHeaderBuffer = iconv.encode(messageHeader, 'euc-kr');
    const messageBuffer = Buffer.concat([messageHeaderBuffer, messageBody, endPoint]);

    const length1 = iconv.encode(paddingByteLenZero(String(messageBuffer.length - 8), 8), 'EUC-KR');
    length1.copy(messageBuffer, 0, 0, messageBuffer.length);

    const finalMsg = Buffer.alloc(messageBuffer.length);
    messageBuffer.copy(finalMsg, 0, 0, messageBuffer.length);
    finalMsg[4] = 0x37;
    finalMsg[5] = 0x34;
    finalMsg[6] = 0x38;
    finalMsg[7] = 0x37;

    this.printRequestMessageLog();

    return finalMsg;
  }

  // request common method
  getResponseType() {
    return this.messageType.replace('Q', 'S');
  }

  // response common method
  makeResponse() {
    const systemHeaderLength = 290;
    const transactionHeaderLength = 222;
    const dataHeaderLength = 10;
    const headerlength = systemHeaderLength + transactionHeaderLength + 2;
    // const datalength = Number(this.data.substr(headerlength, dataHeaderLength - 2));
    const datalength = cutByteLen(this.data, headerlength, utils.getByteLength(this.data)).length;

    const Gid = cutByteLen(this.data, 9, 32);

    const body = cutByteLen(this.data, headerlength - 2, datalength);

    return this.makeResponseBody(body.Gid);
  }

  // response common method
  decodeCommonResponse(body, mciType) {
    const current = moment().format('YYYYMMDDHHmmssSS');
    if (mciType == 'U') {
      if (cutByteLen(this.data, 717, 4) == 0) {
        return {
          resCode: '0000',
          resMsg: 'Send Ums Link SUCC',
          data: {

          },
          resDttm: current,
        };
      } else {
        return {
          resCode: '9999',
          resMsg: 'Send Ums Link FAIL',
          data: {

          },
          resDttm: current,
        };
      }
    } else {
      if (cutByteLen(this.data, 188, 1) == 0) {
        return {
          resCode: '0000',
          resMsg: 'Branch Info SUCC',
          data: {

          },
          resDttm: current,
        };
      } else {
        return {
          resCode: '9999',
          resMsg: 'Branch Info FAIL',
          data: {

          },
          resDttm: current,
        };
      }
    }
  }
};
function cutByteLen(str, strNum, maxByte) {
  let b = null; let i = null; let c = null;
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.substr(strNum, i);
}

function paddingByteLenZero(str, maxbyte) {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }
  return str.padding(maxbyte, false, '0');
}