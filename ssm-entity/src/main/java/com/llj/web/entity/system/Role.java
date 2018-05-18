/**
 * 
 */
package com.llj.web.entity.system;

import java.util.Date;

/**
 * @author lu
 *
 */

public class Role {

	private int id; // id
	private String roleName;// 角色名称
	private String roleStatus;// 角色状态
	private Date updateTime;// 角色状态

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final String getRoleName() {
		return roleName;
	}

	public final void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public final String getRoleStatus() {
		return roleStatus;
	}

	public final void setRoleStatus(String roleStatus) {
		this.roleStatus = roleStatus;
	}

	public final Date getUpdateTime() {
		return updateTime;
	}

	public final void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

}
