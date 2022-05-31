exports.getLinkInfo = {
  linkKey: {
    type: String,
    required: true,
  },
};

exports.checkBlacklist = {
  ani: {
    type: String,
    required: true,
  },
};

exports.createContactKey = {
  ani: {
    type: String,
    required: true,
  },
  webKey: {
    type: String,
    required: true,
  },
};

exports.checkAccessToken = {
  ani: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
};

exports.getMenuInfo = {
  menuCode: {
    type: String,
    required: true,
  },
  childsExistYn: {
    type: String,
    required: true,
  },
  menuLevel: {
    type: String, // numeric query param validate 처리
    required: true,
  },
};