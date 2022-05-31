const models = require('./').models;

exports.getMenuList = async (params) => {
  const where = {};
  if (params.type) {
    where.type = params.type;
  }
  if (params.position) {
    where.position = params.position;
  }
  if (params.url) {
    where.linkUrl = params.url; // TODO: like?
  }
  const result = await models.Menu.findAll({ where });
  return result;
};

exports.getMenuListByGroup = async (params) => {
  const menuGroup = await models.MenuGroup.findOne({
    attributes: ['id'],
    where: { name: params.groupName },
  });
  const result = await models.Menu.findAll({
    include: [
      {
        attributes: [],
        model: models.MenuGroupMap,
        where: { menuGroupId: menuGroup.id },
        required: true, // true, 연결된 rows만을 대상으로 조회 (inner join)
      },
    ],
  });
  return result;
};

exports.getMenuListByUserType = async (params) => {
  const menuGroup = await models.MenuGroup.findOne({
    attributes: ['id'], // 굳이?
    include: [
      {
        model: models.UserGroup,
        where: { userGroupType: params.userType },
        required: true,
      },
    ],
  });
  const result = await models.Menu.findAll({
    include: [
      {
        attributes: [],
        model: models.MenuGroupMap,
        where: { menuGroupId: menuGroup.id },
        required: true,
      },
    ],
  });
  return result;
};

exports.getMenuGroupList = async (params) => {
  const where = {};
  if (params.groupName) {
    where.name = params.groupName;
  }
  const result = await models.MenuGroup.findAll({ where });
  return result;
};