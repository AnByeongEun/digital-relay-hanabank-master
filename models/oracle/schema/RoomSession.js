/*
{
  "records": [
    {
      "ROOM_SESSION_SEQ": 47,
      "ANI": "01067688817",
      "CONTACT_KEY": "yKCdkn0Bfkp0jN_LrTwH",
      "WEB_KEY": "dsIGDg9Zo20220103223513596",
      "ACCESS_TOKEN": "U2FsdGVkX19GE",
      "EXPIRE_DTTM": "2022-01-03 13:50:14",
      "DEL_YN": "N",
      "REG_DTTM": "2022-01-03 13:35:14",
      "UPD_DTTM": "2022-01-03 13:35:14"
    }
  ],
  "listSize": 1
}
*/
module.exports = class RoomSession {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.ROOM_SESSION_SEQ;
    this.ani = row.ANI;
    this.contactKey = row.CONTACT_KEY;
    this.webKey = row.WEB_KEY;
    this.accessToken = row.ACCESS_TOKEN;
    this.expireDateTime = row.EXPIRE_DTTM;
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};