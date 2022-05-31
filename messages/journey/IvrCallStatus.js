module.exports = class IvrCallStatus {
  constructor(response) {
    this.ivrStatus = response.data.IVR_STATE;
  }
};