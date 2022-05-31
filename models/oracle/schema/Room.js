/*
{
  "records": [
    {
      "ROOM_SEQ": 121,
      "CALL_ID": "00001054011634278987",
      "ANI": "01067688817",
      "SYS_NO": "6002",
      "DNIS": "40000",
      "CH_NO": "1",
      "OS": "And",
      "CONN_STATUS": "thru",
      "COMPANY": null,
      "CODE": null,
      "CONFIRM_YN": "N",
      "REG_DTTM": "2021-12-29T05:30:07.000Z",
      "UPD_DTTM": "2021-12-29T05:30:07.000Z"
    }
  ],
  "listSize": 5
}
*/
module.exports = class Room {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.ROOM_SEQ;
    this.callId = row.CALL_ID;
    this.ani = row.ANI;
    this.sysNo = row.SYS_NO;
    this.dnis = row.DNIS;
    this.chNo = row.CH_NO;
    this.os = row.OS;
    this.connStatus = row.CONN_STATUS;
    this.company = row.COMPANY;
    this.code = row.CODE;
    this.confirmYn = row.CONFIRM_YN; // === 'Y'; // boolean
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};