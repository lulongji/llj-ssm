/**
 * 
 */
package com.llj.web.entity.system;

/**
 * 
 * 用户角色信息
 * 
 * @author lu
 *
 */
public class UserRole {

	private int id;
	private int userId;
	private int roleId;
	private String status;

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final int getUserId() {
		return userId;
	}

	public final void setUserId(int userId) {
		this.userId = userId;
	}

	public final int getRoleId() {
		return roleId;
	}

	public final void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public final String getStatus() {
		return status;
	}

	public final void setStatus(String status) {
		this.status = status;
	}

}
