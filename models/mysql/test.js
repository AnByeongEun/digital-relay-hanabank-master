const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

// DataTypes 참고
// https://sequelize.org/v6/manual/model-basics.html#data-types

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false, // not null 여부
    defaultValue: 'none', // 이렇게 default 지정
    field: 'first_name', // custom field 값 지정 가능
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  thirdName: DataTypes.STRING, // type만 정의할 경우 이렇게 shorthand 가능
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW, // Datetime의 경우엔 이렇게 default 지정
    // This way, the current date/time will be used to populate this column (at the moment of insertion)
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Test', // We need to choose the model name
  tableName: 'test', // 이와 같이 테이블명을 그냥 지정할수도 있음
  freezeTableName: true, // 복수형으로 자동 변환하지 않고 정의한 문자열로 테이블명을 사용하려면 true
  //timestamps: false, // createdAt, updatedAt 을 자동으로 생성하고 관리함
  // I don't want createdAt
  //createdAt: false, // 각각 사용 여부를 지정할 수 있음

  // I want updatedAt to actually be called updateTimestamp
  //updatedAt: 'updateTimestamp', // createdAt, updatedAt이 아닌 다른 이름을 사용하려면 이렇게
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

/*
클래스 타입으로 정의할 경우 이렇게 할수도 있음

class User extends Model {
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}
User.init({
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT
}, { sequelize });

console.log(User.classLevelMethod()); // 'foo'
const user = User.build({ firstname: 'Jane', lastname: 'Doe' });
console.log(user.instanceLevelMethod()); // 'bar'
console.log(user.getFullname()); // 'Jane Doe'

user.save();  이렇게 create 가능

User.create()  (combined build() + save())

이렇게 하면 특정 필드만 저장할 수 있음
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });

# bulk create
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
]);
console.log(captains.length); // 2
console.log(captains[0] instanceof Captain); // true
console.log(captains[0].name); // 'Jack Sparrow'
console.log(captains[0].id); // 1 // (or another auto-generated value)

# 출력
user.toJSON(); 으로 로깅에 좋은 형태로 출력 가능?

# Update 방식
user.set({});
user.save()
위 두 가지 합친 방식
User.update()
User.update({password: '새로운 유저PW'}, {where: {userID: '유저ID'}})

# 삭제
User.destroy()

# 조회
User.findAll();
Model.findAll({
  attributes: ['foo', 'bar'] // 조회할 필드 (select projections)
});

alias (bar as baz)
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux']
});
SELECT foo, bar AS baz, qux FROM ...

# 함수 사용
Model.findAll({
  attributes: [
    'foo',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    'bar'
  ]
});
SELECT foo, COUNT(hats) AS n_hats, bar FROM ...

# where oprators
https://sequelize.org/v6/manual/model-querying-basics.html#operators
*/