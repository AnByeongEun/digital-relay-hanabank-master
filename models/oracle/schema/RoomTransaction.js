/*
{
  "records": [
    {
      "ROOM_HIST_SEQ": 0,
      "ROOM_SEQ": 140,
      "MSG_ID": "message140",
      "STATUS": "etc1",
      "REG_DTTM": null,
      "UPD_DTTM": null,
      "ANI": "01067688817",
      "USER_NAME": null
    }
  ],
  "listSize": 1
}
*/
module.exports = class RoomTransaction {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.ROOM_HIST_SEQ;
    this.roomId = row.ROOM_SEQ;
    this.messageId = row.MSG_ID;
    this.status = row.STATUS; // ETC1
    this.etc2 = row.ETC2;
    this.etc3 = row.ETC3;
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};