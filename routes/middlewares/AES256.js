var CryptoJS = require('crypto-js');
const originKey = '1234567890123456';
module.exports = {
  encrypt(value) {
    key = CryptoJS.enc.Utf8.parse(originKey);
    let ciphertext = CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
    return ciphertext;
  },
  decrypt(value) {
    key = CryptoJS.enc.Utf8.parse(originKey);
    let decryptedData = CryptoJS.AES.decrypt(value, key, { iv: key });
    return decryptedData.toString(CryptoJS.enc.Utf8);
  },
};
