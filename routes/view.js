const express = require('express');
const router = express.Router();

const ViewService = new (require('../services/view.services'));
const middlewares = require('./middlewares');
const { ApiAction } = require('./common/wrappers');

/**
 * 링크 키 조회
 */
router.get('/link', ApiAction(async (req, res, next) => {
  const linkKey = req.query.linkKey;

  const result = await ViewService.getLinkKeyInfo(linkKey);
  res.json(result);
}));

/**
 * 메뉴 목록 조회 (type, position, url)
 */
router.get('/menus', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const type = req.query.type;
  const position = req.query.position;
  const url = req.query.url;

  const result = await ViewService.getMenuList(type, position, url);
  res.json(result);
}));

/**
 * 그룹에 포함된 메뉴 목록 조회 (groupName)
 */
router.get('/menus/group', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const groupName = req.query.groupName;

  const result = await ViewService.getMenuListByGroup(groupName);
  res.json(result);
}));

/**
 * 사용자 유형에 연결된 메뉴 목록 조회 (userType)
 */
router.get('/menus/user', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const userType = req.query.userType; // user type // TODO: UserType Enum 정의해야함

  const result = await ViewService.getMenuListByUserType(userType);
  res.json(result);
}));

/**
 * 메뉴 그룹 목록 조회 (groupName)
 */
router.get('/menu-groups', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const groupName = req.query.groupName;

  const result = await ViewService.getMenuGroupList(groupName);
  res.json(result);
}));

/**
 * 사용자 그룹 목록 조회
 */
router.get('/user-groups', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const result = await ViewService.getUserGroupList();
  res.json(result);
}));

/**
 * 공통 코드 조회 (code)
 */
router.get('/codes/:code', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const code = req.params.code;

  const result = await ViewService.getCommonCode(code);
  res.json(result);
}));

/**
 * 공통 코드 목록 조회 (codeGroup)
 */
router.get('/codes', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const codeGroup = req.query.codeGroup;

  const result = await ViewService.getCommonCodeListByGroup(codeGroup);
  res.json(result);
}));

/**
 * 서비스 제외고객 여부 확인
 */
router.get('/check/denial', middlewares.checkAuth(), ApiAction(async (req, res, next) => {
  const ani = req.query.ani;

  const result = await ViewService.checkServiceDenialUser(ani);
  res.json(result);
}));

/**
 * View Action 저장
 */
router.post('/actions', ApiAction(async (req, res, next) => {
  const { linkKey, name, actionType, code } = req.body;

  const result = await ViewService.createViewAction(linkKey, name, actionType, code);
  res.json(result);
}));

/**
 * View Action 목록 조회
 */
router.get('/actions', ApiAction(async (req, res, next) => {
  const linkKey = req.query.linkKey;

  const result = await ViewService.getViewActionList(linkKey);
  res.json(result);
}));

/**
 * View Action 삭제
 */
router.post('/actions/delete', ApiAction(async (req, res, next) => {
  const linkKey = req.body.linkKey;

  const result = await ViewService.deleteViewActions(linkKey);
  res.json(result);
}));

module.exports = router;