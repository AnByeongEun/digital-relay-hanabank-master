const aesjs = require('aes-js');

/**
 * http://www.crypto-it.net/eng/theory/padding.html
 *
 * PKCS#5 and PKCS#7 Padding
 * 추가되어야 하는 pad의 총 수(1~16)가 pad의 값으로 들어감 (정확히는 0x0F까지 아님?)
 *
 * ISO7816-4Padding
 * 추가되어야 하는 pad 중 첫번째 pad만 128(0x80)가 추가되고 나머지는 0x00이 추가됨
 */

function iso7816_4Pad(data, result, padder) {
  result[data.length] = 128;
  return result;
}

function pkcs7pad(data, result, padder) {
  for (var i = data.length; i < result.length; i++) {
    result[i] = padder;
  }
  return result;
}

const encryptor = (keyString, input, padding) => {
  const key = keyString.trim();
  const value = input.trim();
  const bytes = aesjs.utils.utf8.toBytes(value);
  const data = aesjs._arrayTest.coerceArray(bytes, true);

  const padder = 16 - (data.length % 16);
  const result = aesjs._arrayTest.createArray(data.length + padder);
  aesjs._arrayTest.copyArray(data, result);

  const inputBuffer = padding(data, result, padder);

  const keyBuffer = aesjs.utils.utf8.toBytes(key);
  const escEcb = new aesjs.ModeOfOperation.ecb(keyBuffer);
  const encryptedBytes = escEcb.encrypt(inputBuffer);

  const encryptedData = Buffer.from(encryptedBytes).toString('base64');
  return encryptedData;
};

const iso7816_4Regex = /[\u{0080},\u{0000}]/gu;

const pkcs7Regex = /[\u{0001}-\u{0010}]/gu;

const decryptor = (keyString, input, regex) => {
  const key = keyString.trim();
  const data = input.trim();

  const keyBuffer = aesjs.utils.utf8.toBytes(key);
  const escEcb = new aesjs.ModeOfOperation.ecb(keyBuffer);
  const buf = Buffer.from(data, 'base64');
  const decryptedBytes = escEcb.decrypt(buf);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

  const result = regex.test(decryptedText) ? decryptedText.replace(regex, '') : decryptedText;
  return result.trim();
};

exports.iso7816_4Encrypt = (key, body) => {
  return encryptor(key, body, iso7816_4Pad);
};

exports.pkcs7Encrypt = (key, body) => {
  return encryptor(key, body, pkcs7pad);
};

exports.iso7816_4Decrypt = (key, body) => {
  return decryptor(key, body, iso7816_4Regex);
};

exports.pkcs7Decrypt = (key, body) => {
  return decryptor(key, body, pkcs7Regex);
};