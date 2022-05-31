/*
{
  "records": [
    {
      "CONFIG_SEQ": 0,
      "SERVICE_NAME": "SBI_Digital_ARS",
      "MESSAGE_LANG": "KO",
      "ACCTOKEN_EXPIRED": "M:15",
      "REST_TIME_OUT": "3",
      "AES128_ENCRYPT_KEY": null,
      "COUNSEL_WAIT_TIME": "0",
      "COUNSEL_WAIT_USER": "0",
      "COUNSEL_YN": "Y",
      "COUNSEL_STATUS": "free",
      "ETC5": null,
      "DEL_YN": "N",
      "REG_DTTM": "2021-09-09T15:00:00.000Z",
      "REG_ADMIN_ID": "admin2",
      "MOD_DTTM": "2021-12-13T15:00:00.000Z",
      "MOD_ADMIN_ID": "admin2"
    }
  ],
  "listSize": 1
}
*/
module.exports = class ServerConfig {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.CONFIG_SEQ;
    this.serviceName = row.SERVICE_NAME;
    this.messageLang = row.MESSAGE_LANG;
    this.accessTokenExpired = row.ACCTOKEN_EXPIRED;
    this.restTimeout = row.REST_TIME_OUT;
    this.aes128EncryptKey = row.AES128_ENCRYPT_KEY;
    this.counselWaitTime = row.COUNSEL_WAIT_TIME;
    this.counselWaitUser = row.COUNSEL_WAIT_USER;
    this.counselYn = row.COUNSEL_YN;
    this.counselStatus = row.COUNSEL_STATUS;
    this.etc5 = row.ETC5;
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};