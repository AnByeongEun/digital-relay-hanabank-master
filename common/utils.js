const moment = require('moment');
const Crypto = require('crypto-js');
const HashMap = require('hashmap');
const ogs = require('open-graph-scraper');

const pad = (number, length) => {
  var str = `${number}`;
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
};

Date.prototype.YYYYMMDDHHMMSS = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);
  var mm = pad(this.getMinutes(), 2);
  var ss = pad(this.getSeconds(), 2);

  return yyyy + MM + dd + hh + mm + ss;
};

const addZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

const getCurrentTime = (type) => {
  var date = new Date();
  var year = date.getFullYear();
  var month = addZero(date.getMonth() + 1);
  var day = addZero(date.getDate());
  var hour = addZero(date.getHours());
  var minute = addZero(date.getMinutes());
  var second = addZero(date.getSeconds());
  var milliseconds = addZero(date.getMilliseconds());
  var currentTime = '';

  if (type == 'TIME') {
    currentTime = `${year}${month}${day}${hour}${minute}${second}`;
  } else if (type == 'DATE') {
    currentTime = `${year}${month}${day}`;
  } else if (type == 'UUID') {
    currentTime = `${year}${month}${day}${hour}${minute}${second}${milliseconds}`;
  }

  return currentTime;
};

const getCurrentMoment = () => {
  return moment().format('YYYYMMDDHHmmssSSS');
};

const getDate = () => {
  const date = new Date();
  return date.YYYYMMDDHHMMSS();
};

const generateRandomString = (length) => {
  return Math.random().toString(36).substr(2, length);
};

const getByteLength = (message) => {
  var stringByteLength = 0;
  stringByteLength = (function(s, b, i, c) {
    for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  })(message);
  return stringByteLength;
};

const cutByByteLength = (str, maxByte) => {
  for (b = i = 0; c = str.charCodeAt(i);) {
    b += c >> 7 ? 2 : 1;
    if (b > maxByte) break;
    i++;
  }

  return str.substring(0, i);
};

const convertKebabToCamel = (str) => {
  const split = str.split('-');
  return split.map((item, index) => {
    const result = index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase();
    return result;
  }).join('');
};

const messagePadding = function (size, end = true, pad = ' ') {
  let value = this;
  const valueLength = getByteLength(value);
  if (size - valueLength >= 0) {
    const padArr = new Array(size - valueLength).fill(pad);
    padArr.forEach(p => value = end ? value + p : p + value); // 지정된 길이만큼 pad로 채움
    return value;
  } else {
    const messages = require('../messages');
    throw new messages.error.InvalidDataError(value);
  }
};

// 별도의 Process fn 을 선언 (항상 error 가 앞에 와야 함, 에러 발생시 뒤가 없기 때문.)
const ogsinfo = (url, fn) => {
  return ogs({ url: url }, (err, ret) => {
    // callback 함수
    fn(err, ret);
  });
};

// salt key
const EncryptKey = 'nodevue';

const encrypt = (data, key) => {
  // key 가 없는 경우 , EncryptKey 를 사용하도록 설정
  // .digest("hex") = 암호화된 캐릭터가 깨지는 경우를 막기 위해, 16진수 (0~9ABCDEF) 로 적용

  // digest 가 없어서, TypeError: Crypto.AES.encrypt(...).digest is not a function
  // return Crypto.AES.encrypt(data, key || EncryptKey).digest("hex");

  return Crypto.AES.encrypt(JSON.stringify({ data }), key || EncryptKey).toString();
};

const decrypt = (data, key) => {
  // key 가 없는 경우 , EncryptKey 를 사용하도록 설정
  return Crypto.AES.decrypt(data, key || EncryptKey).toString(Crypto.enc.Utf8);
};

// sha256을 sha2 라고 부름
const encryptSha256 = (data, k) => {
  if (!data) return null;
  const key = k || EncryptKey;

  try {
    return Crypto.SHA256(data + key).toString();
  } catch (error) {
    console.error('Error on EncryptSha256::', error);
  }
};

const encryptSha1 = (data, k) => {
  if (!data) return null;
  const key = k || EncryptKey;

  try {
    return Crypto.SHA1(data).toString();
  } catch (error) {
    console.error('Error on EncryptSha1::', error);
  }
};

const encryptBase64 = (value) => {
  const words = Crypto.enc.Utf8.parse(value);
  return Crypto.enc.Base64.stringify(words);
};

const decryptBase64 = (encodedData) => {
  const words = Crypto.enc.Base64.parse(encodedData);
  return words.toString(Crypto.enc.Utf8);
};

module.exports = {
  getCurrentTime,
  getCurrentMoment,
  encrypt,
  getDate,
  generateRandomString,
  getByteLength,
  cutByByteLength,
  convertKebabToCamel,
  messagePadding,
  encryptBase64,
  decryptBase64,
};