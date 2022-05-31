const net = require('net'); // 서버 5000번 포트로 접속

const host = '211.115.207.209';
const port = '60405';

/**
 * 방화벽 작업 된 개발 서버에서 전문 중개 목적으로 사용하기 위한 스크립트
 * 로컬에서 전문 테스트를 하기 위한 목적
 */

var server = net.createServer(function(socket) {
  console.log(`${socket.address().address} connected.`);

  // client로 부터 오는 data를 화면에 출력
  socket.on('data', function(data) {
    console.log(`rcv: ${data}`);

    const channel = net.connect({ host, port });

    channel.on('connect', function() {
      console.log('====================> Connected to server!');
      channel.write(data);
      console.log(`send ==> ${data}`);
    });

    channel.on('data', function(chunk) {
      console.log(`recv <== ${chunk}`);
      socket.write(chunk);
      channel.end();
    });

    // 접속이 종료됬을때 메시지 출력
    channel.on('end', function() {
      console.log('====================> Disconnected');
      // process.exit(0);
    });

    // 에러가 발생할때 에러메시지 화면에 출력
    channel.on('error', function(err) {
      console.log(err);
    });

    // connection에서 timeout이 발생하면 메시지 출력
    channel.on('timeout', function() {
      console.log('connection timeout.');
    });
  });

  // client와 접속이 끊기는 메시지 출력
  socket.on('close', function() {
    console.log('client disconnted.');
  });
});

// 에러가 발생할 경우 화면에 에러메시지 출력
server.on('error', function(err) {
  console.log(`err${err}`);
});

// Port 5000으로 접속이 가능하도록 대기
server.listen(5000, function() {
  console.log('linsteing on 5000..');
});
