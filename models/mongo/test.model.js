// TODO: mongo의 model이 필요한지, oracle, mysql 구조랑 비교해보고 결정

const Comment = require('./schemas/comment');
const User = require('./schemas/user');

exports.createUser = async (model) => {
  const user = await User.create(model);
  console.log(`>> user : ${user}`);
  return user;
};

exports.findUser = async (filter) => {
  const user = await User.find(filter);
  return user;
};

exports.createComment = async (model) => {
  const comment = await Comment.create(model);
  console.log(`>> comment : ${comment}`);
  return comment;
  // TODO: 에러 처리 방식 정의
};

exports.findComment = async (filter) => {
  const comment = await Comment.find(filter);
  return comment;
};

exports.findCommentPop = async (commentModel) => {
  const comment = await Comment.populate(commentModel, { path: 'commenter' });
  return comment;
};

exports.findCommentPop2 = async (id) => {
  const comment = await Comment.find(id).populate('commenter');
  return comment;
};

exports.updateComment = async (filter, model) => {
  const comment = await Comment.updateOne(filter, model); // mongoose는 $set 생략해도 됨
  return comment;
};

exports.deleteComment = async (filter) => {
  const comment = await Comment.remove(filter);
  return comment;
};

/**
 * find methods
 * find, findById, findByIdAndRemove, findByIdAndDelete, findByIdAndUpdate
 * findOne, findOneAndRemove, findOneAndDelete, findOneAndUpdate
 *
 * populate (거주시키다. 필요한 데이터를 특정 위치에 주입시키는 느낌)
 * id 형식으로 된 문서의 경로를 실제 문서의 데이터(객체)로 변경하는 작업
 * - 해당 문서가 없다면 필드값 null
 * - 여러 populate 동시 사용 가능
 * - 여러 populate 사용시 나중에 사용한 동작이 overwrite 한다
 *
 * update
 * updateOne, updateMany, bulkWrite
 * 응답 형식
 * {
 *   "n": 1,
 *   "nModified": 1,
 *   "ok": 1
 * }
 */

/**
 * validate
 *
 * const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});
 *
 *
 */

/*
  *** Nested populate

User
  .findOne({ _id: userId })
  .populate({
    path: 'blogs', // populate blogs
    populate: {
      path: 'comments', // in blogs, populate comments
    },
  })
  .then(user => {
    res.json(user);
  });

  OUTPUT:
{
  _id: userid, // obviously it will be id generated by mongo
  name: "john doe",
  email: "john@email.com",
  blogs: [
      {
          _id: blogid,
          title: "how to do nothing",
          body: "Interesting matter in the blog...",
          comments: [
              {
                  user: userId,
                  blog: blogId,
                  body: "your blog is awesome !"
              }
          ]
      }
  ]
}
*/