module.exports = class UserGroupResponse {
  constructor(response) {
    this.id = response.id;
    this.menuGroupId = response.menuGroupId;
    this.name = response.name;
    this.description = response.description;
    this.userGroupType = response.userGroupType;
  }
};