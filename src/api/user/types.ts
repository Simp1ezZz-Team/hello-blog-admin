export interface UserInfo {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 角色列表
   */
  roleList: string[];
  /**
   * 权限列表
   */
  permissionList: string[];
}
