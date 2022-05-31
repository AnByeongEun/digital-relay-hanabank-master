const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const messages = {};

const readMessageType = (directory) => {
  fs.readdirSync(`${__dirname}/${directory}`)
    .filter(name => {
      const filepath = path.join(__dirname, directory, name);
      if (fs.statSync(filepath).isDirectory()) {
        return false;
      }
      return name !== basename;
    })
    .forEach(file => {
      const name = file.split('.')[0];
      if (name) {
        const message = require(path.join(__dirname, directory, name));
        const split = directory.split('/');
        if (split[0] === 'mci') {
          // mci 메세지는 관리 차원에서 디렉토리로 구분할 필요가 있으나 (./mci/hanabank, ./mci/postoffice, 등)
          // 실제 사용할 때에는 하나의 특정 고객사 메시지만 사용할 것이므로 leveling 할 필요가 없이 mci 최상단에 할당
          // TODO: 추후 개선 필요시 수정
          messages[split[0]][name] = message;
        } else {
          let temp = messages;
          split.forEach((curr, index) => {
            temp = temp[curr];
            if (split.length - 1 === index) {
              temp[name] = message;
            }
          });
        }
      }
    });
};

// TODO: mci쪽 처리 필요
const makeDefaultObject = (path) => {
  let temp = messages;
  path.split('/').forEach(curr => {
    if (!temp[curr]) {
      temp[curr] = {};
    }
    temp = temp[curr];
  });
};

const traverseDirectories = (dir, result = []) => {
  fs.readdirSync(dir).forEach((current) => {
    const filepath = path.resolve(dir, current);

    if (fs.statSync(filepath).isDirectory()) {
      const directory = filepath.substring(__dirname.length + 1);
      const root = directory.split('/')[0];

      if (root === 'server' || current !== 'common') {
        makeDefaultObject(directory);
        readMessageType(directory);
      }

      const fileStats = { dir: current, type: 'dir', files: [] };
      result.push(fileStats);
      return traverseDirectories(filepath, fileStats.files);
    }
  });
  return result;
};

traverseDirectories(path.join(__dirname));
module.exports = messages;