/*
{
  "records": [
    {
      "DOQ_SEQ": 20,
      "DOQ_CD": "MENU_10420",
      "DOQ_DESC": null,
      "DEL_YN": "N",
      "REG_DTTM": null,
      "REG_ADMIN_ID": null,
      "MOD_DTTM": null,
      "MOD_ADMIN_ID": null
    }
  ],
  "listSize": 1
}
*/
module.exports = class ExternalDocument {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.DOQ_SEQ;
    this.documentCode = row.DOQ_CD;
    this.documentDesc = row.DOQ_DESC;
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};