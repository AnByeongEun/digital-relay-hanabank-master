const net = require('net');

// const messages = require('../../messages');

const host = 'localhost';
const port = '5005';

const channel = net.connect({ host, port });

const getMessageBody = (type) => {
  if (type === 'SARS0001') {
    const linkKey = 'z1dMGT7F-'.padEnd(20, ' ');
    const serviceType = 'SVC1'.padEnd(10, ' ');
    const serviceName = 'service1'.padEnd(20, ' ');
    const dnis = '44000'.padEnd(20, ' ');
    const linkUrl = 'http://linkurl.co.or'.padEnd(200, ' ');
    const redirectUrl = 'http://redirecturl.com'.padEnd(200, ' ');
    const startDate = '20220303'.padEnd(8, ' ');
    const endDate = '20250303'.padEnd(8, ' ');
    const startTime = '0900'.padEnd(4, ' ');
    const endTime = '2200'.padEnd(4, ' ');
    const clickCount = '12'.padEnd(4, ' ');
    const telecomType = 'S'.padEnd(1, ' ');
    const platformType = 'Android'.padEnd(10, ' ');
    const serviceSupportYn = 'Y'.padEnd(1, ' ');
    const launcherSupportYn = 'Y'.padEnd(1, ' ');
    const invokeType = 'AS'.padEnd(2, ' ');
    const phoneType = 'S'.padEnd(1, ' ');
    const vdlCode = '0000'.padEnd(4, ' ');
    const vdlType = 'V'.padEnd(2, ' ');

    const service = `${linkKey}${serviceType}${serviceName}${dnis}${linkUrl}${redirectUrl}`;
    const datetime = `${startDate}${endDate}${startTime}${endTime}${clickCount}`;
    const callgate = `${telecomType}${platformType}${serviceSupportYn}${launcherSupportYn}${invokeType}${phoneType}${vdlCode}${vdlType}`;

    return `${service}${datetime}${callgate}`;
  } else if (type === 'SARS0003') {
    const modalState = 'A'.padEnd(1, ' ');
    const webKey = 'webkey123'.padEnd(30, ' ');
    const linkKey = 'z1dMGT7F-'.padEnd(20, ' ');
    const serviceType = 'SVC1'.padEnd(10, ' ');
    const serviceName = 'service1'.padEnd(20, ' ');
    const dnis = '44000'.padEnd(20, ' ');
    const conOS = 'android'.padEnd(15, ' ');
    const conDevice = 'mobile'.padEnd(15, ' ');
    const conBrowser = 'safari'.padEnd(15, ' ');
    const lastFlag = 'Y'.padEnd(1, ' ');

    const service = `${modalState}${webKey}${linkKey}${serviceType}${serviceName}${dnis}`;
    const userAgent = `${conOS}${conDevice}${conBrowser}${lastFlag}`;

    return `${service}${userAgent}`;
  } else {
    return '';
  }
};

// ?????? ????????? ????????? ????????? ??????
channel.on('connect', function() {
  // 1????????? idle ?????? ???????????? ?????? ??????
  console.log('====================> Connected to server!');

  const msgType = 'SARS0001';

  // const body = 'abcdefghijklmnopqrst'; // length 20
  const body = getMessageBody(msgType); // length 20

  const messageType = msgType.padEnd(10, ' ');
  const channelType = 'SARS'.padEnd(6, ' ');
  const channelKey = '12345678901234567890'.padEnd(20, ' ');
  const ani = '01012341234'.padEnd(16, ' ');
  const datetime = '20220305111121323'.padEnd(18, ' ');
  const bodyLength = (body.length + 0).toString().padEnd(10, ' ');
  const header = `${messageType}${channelType}${channelKey}${ani}${datetime}${bodyLength}`;

  const message = `${header}${body}`;

  channel.write(message);
  console.log(`send ==> ${message}`);
});

// ?????? ????????? connection ????????? ???
channel.on('data', function(chunk) {
  console.log(`recv <== ${chunk}`);
  channel.end();
});

// ????????? ??????????????? ????????? ??????
channel.on('end', function() {
  console.log('====================> Disconnected');
  process.exit(0);
});

// ????????? ???????????? ??????????????? ????????? ??????
channel.on('error', function(err) {
  console.log(err);
});

// connection?????? timeout??? ???????????? ????????? ??????
channel.on('timeout', function() {
  console.log('connection timeout.');
});