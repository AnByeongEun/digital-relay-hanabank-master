/*
{
  "records": [
    {
      "CODE_SEQ": 63,
      "CODE_GROUP": "SAMPLE0538",
      "CODE": "2",
      "VALUE": "1",
      "CODE_ORDER": 4,
      "USE_AT": "N",
      "DEL_YN": "Y",
      "REG_DTTM": "2021-09-27T15:00:00.000Z",
      "REG_ADMIN_ID": "admin2",
      "MOD_DTTM": "2021-09-29T15:00:00.000Z",
      "MOD_ADMIN_ID": "admin2"
    },
    {
      "CODE_SEQ": 64,
      "CODE_GROUP": "SAMPLE0539",
      "CODE": "5",
      "VALUE": "4",
      "CODE_ORDER": 6,
      "USE_AT": "Y",
      "DEL_YN": "Y",
      "REG_DTTM": "2021-09-27T15:00:00.000Z",
      "REG_ADMIN_ID": "admin2",
      "MOD_DTTM": "2021-09-29T15:00:00.000Z",
      "MOD_ADMIN_ID": "admin2"
    }
  ],
  "listSize": 380
}
*/
module.exports = class CommonCode {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.CODE_SEQ;
    this.codeGroup = row.CODE_GROUP;
    this.code = row.CODE;
    this.value = row.VALUE;
    this.codeOrder = row.CODE_ORDER;
    this.useAt = row.USE_AT;
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};