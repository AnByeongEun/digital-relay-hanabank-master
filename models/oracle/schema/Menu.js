/*
{
  "records": [
    {
      "MENU_SEQ": 28,
      "MENU_NAME": "¥Î√‚Ω≈√ª",
      "MENU_CODE": "MENU_10100",
      "MENU_IMAGE_LINK": "http://192.168.20.101:3009/images/m01.svg",
      "THRU_IMAGE_LINK": "https://divr.sbisb.co.kr/images/m01.svg",
      "BACKGROUND_COLOR": "null",
      "FONT_COLOR": "null",
      "DISCONN_YN": "Y",
      "LINK_NAME": "out",
      "LINK_URL": "https://m.babilloan.com/mobile/bridge/sbi/bridge_CN002.jsp?src=naver_br&kw=035DE2#2",
      "COUNSELOR_CALL_NUM": "null",
      "SKILL_GROUP_ID": "584013",
      "CALLBACK_YN": null,
      "SERVICE_YN": "N",
      "SERVICE_CODE": "null",
      "SERVICE_NAME": "null",
      "AUTH_LEVEL_CODE": "N",
      "MENU_ORDER": 10100,
      "MENU_LEVEL": 2,
      "PARENT_MENU_CODE": "MENU_10000",
      "MENU_TYPE": "M",
      "STATS_YN": "N",
      "CHILDS_EXIST_YN": "N",
      "DEL_YN": "N",
      "REG_DTTM": "2021-09-23 18:08:35",
      "REG_ADMIN_ID": "admin",
      "MOD_DTTM": "2021-11-11 13:29:01",
      "MOD_ADMIN_ID": "admin"
    }
  ],
  "listSize": 7
}
*/
module.exports = class Menu {
  // oracle 응답 받아서 넣는다
  // 단일 record만 받는다
  constructor(row) {
    this.id = row.MENU_SEQ;
    this.menuName = row.MENU_NAME;
    this.menuCode = row.MENU_CODE;
    this.menuImageLink = row.MENU_IMAGE_LINK;
    this.thruImageLink = row.THRU_IMAGE_LINK;
    this.backgroundColor = row.BACKGROUND_COLOR;
    this.fontColor = row.FONT_COLOR;
    this.dissconnYn = row.DISCONN_YN; // === 'Y'; // boolean
    this.linkName = row.LINK_NAME;
    this.linkUrl = row.LINK_URL;
    this.counselorCallNum = row.COUNSELOR_CALL_NUM;
    this.skillGroupId = row.SKILL_GROUP_ID;
    this.callbackYn = row.CALLBACK_YN; // === 'Y'; // boolean
    this.serviceYn = row.SERVICE_YN; // === 'Y'; // boolean
    this.serviceCode = row.SERVICE_CODE;
    this.serviceName = row.SERVICE_NAME;
    this.authLevelCode = row.AUTH_LEVEL_CODE;
    this.menuOrder = row.MENU_ORDER;
    this.menuLevel = row.MENU_LEVEL;
    this.parentMenuCode = row.PARENT_MENU_CODE;
    this.menuType = row.MENU_TYPE;
    this.statsYn = row.STATS_YN; // === 'Y'; // boolean
    this.childrenExistYn = row.CHILDS_EXIST_YN; // === 'Y'; // boolean
    this.removed = row.DEL_YN; // === 'Y'; // boolean
    this.creuser = row.REG_ADMIN_ID || null;
    this.upduser = row.MOD_ADMIN_ID || null;
    this.cretime = row.REG_DTTM || null;
    this.updtime = row.MOD_DTTM || null;
  }
};