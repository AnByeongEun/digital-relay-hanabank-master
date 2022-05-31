/*
{
  "records": [
    {
      "BLACK_LIST_SEQ": 140,
      "ANI": "01085111166",
      "DEL_YN": "N",
      "REG_DTTM": "2021-12-03 10:24:54",
      "UPD_DTTM": "2021-12-03 10:24:54"
    }
  ],
  "listSize": 1
}
*/

module.exports = class Blacklist {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.BLACK_LIST_SEQ;
    this.ani = row.ANI;
    this.removed = row.DEL_YN; // === 'Y'; // boolean ??
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};