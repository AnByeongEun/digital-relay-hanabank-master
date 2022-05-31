const net = require('net'); // 서버 5000번 포트로 접속

const port = 5001;

var server = net.createServer(function(client) {
  console.log(`${client.address().address} connected.`);

  client.on('connect', function(d) {
    console.log(d);
    console.log('connect tcp server');
  });

  // client로 부터 오는 data를 화면에 출력
  client.on('data', function(data) {
    console.log(`recv <== ${data}`);
    const messageLength = 8;
    const dataHeaderLength = 8;
    const header = data.toString().substring(messageLength, 522 - dataHeaderLength);

    const body = `12340    ${' '.repeat(1000)}${'this is address information'.padEnd(500, ' ')}   ${'this is parking information'.padEnd(500, ' ')}...............`;
    console.log(`body ==> ${body}`);

    const bodyLength = body.length.toString().padStart(8, '0');
    const message = `${header}${bodyLength}${body}@@`;
    const result = `${message.length.toString().padStart(8, '0')}${message}`;

    console.log(`send <== ${result}`);
    client.write(result);
  });

  // client와 접속이 끊기는 메시지 출력
  client.on('close', function() {
    console.log('client disconnted.');
  });
});

// 에러가 발생할 경우 화면에 에러메시지 출력
server.on('error', function(err) {
  console.log(`err${err}`);
});

// Port 5001으로 접속이 가능하도록 대기
server.listen(port, function() {
  console.log(`linsteing on ${port}..`);
});
