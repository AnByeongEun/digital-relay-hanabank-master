'use strict';

// pm2 환경 설정 파일(ecosystem.config.js) 로컬 테스트용

module.exports = {
  apps: [
    {
      name: 'relay',
      script: '/Users/hanseung/Development/digital-relay/dist',
      watch: false,
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        ENV_PATH: '/Users/hanseung/Development/digital-relay/',
      },
    },
  ],
};