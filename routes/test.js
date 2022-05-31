const express = require('express');
const router = express.Router();

// const TestService = require('../services/test.services');
const TestModel = require('../models/mongo/test.model');

router.get('/', async (req, res, next) => {
  try {
    // user 생성
    // const newUser = await TestModel.createUser({
    //   name: 'hanseung1',
    //   age: 34,
    //   married: true,
    //   comment: 'comment 입니다',
    // });

    // User 조회
    // const result = await TestModel.findUser({ name: 'hanseung1' });

    // Comment 조회
    // const comment1 = await TestModel.findComment({ name: 'hanseung' });

    // Comment 생성
    // const result = await TestModel.createComment({
    //   commenter: '619c744ffcc936f5882e17fa',
    //   comment: 'comment 입니다1',
    // });

    // Comment Populate
    // const result1 = await TestModel.findCommentPop(result);
    const result = await TestModel.findCommentPop2({ _id: '619c77ca4c649efc6605d615' });

    // Comment update
    // const result = await TestModel.updateComment({
    //   _id: '619c78828d0dfdfd9b5b3b64',
    // }, {
    //   comment: '수정된 코멘트 입니다',
    // });

    // Comment delete
    // const result = await TestModel.deleteComment({ _id: '619c79a5ad1bb5ffa98f8665' });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;