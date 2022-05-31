'use strict';

// pm2 환경 설정 파일(ecosystem.config.js) 관리 용도로 작성

module.exports = {
  apps: [
    {
      name: 'relay',
      script: '/home/ec2-user/pkg/relay/digital-relay',
      watch: false,
      // instances: 2, // fork만 사용
      // exec_mode: 'cluster', // 일단 fork만 사용, 테스트 필요
      env: {
        NODE_ENV: 'development',
        ENV_PATH: '/home/ec2-user/conf/relay/',
      },
    },
  ],
};