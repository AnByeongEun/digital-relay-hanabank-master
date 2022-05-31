exports.createContactKey = {
  callId: {
    type: String,
    required: true,
  },
  sysno: {
    type: String,
    required: true,
  },
  dnis: {
    type: String,
    required: true,
  },
  ani: {
    type: String,
    required: true,
  },
  chno: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
};