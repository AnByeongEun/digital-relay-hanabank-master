const net = require('net'); // 서버 5000번 포트로 접속

const messages = require('../../messages');

const host = '15.164.71.110';
const port = '5000';

if (!process.argv[2]) {
  console.error('Enter message type !!');
  process.exit(0);
}

const messageType = process.argv[2];

const channel = net.connect({ host, port });

const getMessage = () => {
  return new messages.callgate[messageType]().make();
};

// console.log(getMessage());

// 한번 연결에 하나의 요청만 처리
channel.on('connect', function() {
  // 1분동안 idle 이면 서버에서 연결 끊음
  console.log('====================> Connected to server!');

  const message = getMessage();
  console.log(`====================> Send [${messageType}] message`);

  channel.write(message);
  console.log(`send ==> ${message}`);
});

// 응답 받으면 connection 끊어야 함
channel.on('data', function(chunk) {
  console.log(`recv <== ${chunk}`);
  /**
   * Callgate Response Code
   * 8007 : decryption 실패
   */
  const responseMessageType = messageType.replace('Q', 'S');
  const response = new messages.callgate[responseMessageType](chunk).destructResponse(); // object
  console.log(`====================> Destructed message \n${JSON.stringify(response, null, 2)} `);
  channel.end();
});

// 접속이 종료됬을때 메시지 출력
channel.on('end', function() {
  console.log('====================> Disconnected');
  process.exit(0);
});

// 에러가 발생할때 에러메시지 화면에 출력
channel.on('error', function(err) {
  console.log(err);
});

// connection에서 timeout이 발생하면 메시지 출력
channel.on('timeout', function() {
  console.log('connection timeout.');
});