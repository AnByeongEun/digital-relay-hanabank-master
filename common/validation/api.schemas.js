exports.clientDevice = {
  ani: {
    type: String,
    required: true,
  },
};

// TODO: 세부 조건 추가(min, max 등)
exports.createLinkKey = {
  CALL_ID: {
    type: String,
    required: true,
  },
  CONTACT_KEY: {
    type: String,
    required: true,
  },
  CLICK_CNT: {
    type: String,
    required: true,
  },
  ANI: {
    type: String,
    required: true,
  },
  STR_DTTM: {
    type: String,
    required: true,
  },
  END_DTTM: {
    type: String,
    required: true,
  },
  STR_TIME: {
    type: String,
    required: true,
  },
  END_TIME: {
    type: String,
    required: true,
  },
  ORIGIN_URL: {
    type: String,
    required: true,
  },
};

exports.sendLink = {
  ani: {
    type: String,
    required: true,
  },
  telecomType: {
    type: String,
    required: true, // length 1
  },
  smsText: {
    type: String,
    required: true, // 결정 필요
  },
  directUrlSmsYn: {
    type: String,
    required: true,
  },
  directUrlSmsText: {
    type: String,
    required: false,
  },
  extraParam: {
    type: String,
    required: false,
  },
};