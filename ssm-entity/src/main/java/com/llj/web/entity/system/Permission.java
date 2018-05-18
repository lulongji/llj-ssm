/**
* 
*/
package com.llj.web.entity.system;

/**
 * @author lu
 *
 */
public class Permission {

	private int id; // id
	private int roleId;// 角色关联id
	private int permissionId;// 关联权限id
	private String status;// 状态

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final int getRoleId() {
		return roleId;
	}

	public final void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public final int getPermissionId() {
		return permissionId;
	}

	public final void setPermissionId(int permissionId) {
		this.permissionId = permissionId;
	}

	public final String getStatus() {
		return status;
	}

	public final void setStatus(String status) {
		this.status = status;
	}

}
