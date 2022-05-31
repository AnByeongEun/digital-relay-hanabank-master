/*
{
  "records": [
    {
      "REQ_SEQ": 120,
      "PARAM_SEQ": 280,
      "PARAM_NAME": "ANI",
      "DATA_TYPE": "String",
      "MIN_LENGTH": 1,
      "MAX_LENGTH": 14,
      "OBJECT_PARAM_SEQ": 0,
      "TEST_DATA": "01012345678",
      "MANDANTORY_YN": "Y",
      "DEL_YN": "N",
      "REG_DTTM": "2021-12-03T15:00:00.000Z",
      "REG_ADMIN_ID": "admin2",
      "MOD_DTTM": "2021-12-03T15:00:00.000Z",
      "MOD_ADMIN_ID": "admin2"
    },
    {
      "REQ_SEQ": 120,
      "PARAM_SEQ": 281,
      "PARAM_NAME": "MENU_CODE",
      "DATA_TYPE": "String",
      "MIN_LENGTH": 1,
      "MAX_LENGTH": 10,
      "OBJECT_PARAM_SEQ": 0,
      "TEST_DATA": "MENU_10000",
      "MANDANTORY_YN": "Y",
      "DEL_YN": "N",
      "REG_DTTM": "2021-12-03T15:00:00.000Z",
      "REG_ADMIN_ID": "admin2",
      "MOD_DTTM": "2021-12-03T15:00:00.000Z",
      "MOD_ADMIN_ID": "admin2"
    }
  ],
  "listSize": 7
}
*/
module.exports = class Blacklist {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.PARAM_SEQ;
    this.requestId = row.REQ_SEQ;
    this.paramName = row.PARAM_NAME;
    this.dataType = row.DATA_TYPE;
    this.minLength = row.MIN_LENGTH;
    this.maxLength = row.MAX_LENGTH;
    this.objectParamSeq = row.OBJECT_PARAM_SEQ;
    this.testData = row.TEST_DATA;
    this.mandatoryYn = row.MANDANTORY_YN; // === 'Y'; // boolean
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};