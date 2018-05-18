package com.llj.web.entity.system;

import java.util.Date;

/**
 * 
 * 用户
 * 
 * @author lu
 * @version v1.0
 *
 */
public class User {

	private int id;
	private String userName;
	private String password;
	private String roleId;
	private Date createTime;
	private Date updateTime;

	public final String getRoleId() {
		return roleId;
	}

	public final void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final String getUserName() {
		return userName;
	}

	public final void setUserName(String userName) {
		this.userName = userName;
	}

	public final String getPassword() {
		return password;
	}

	public final void setPassword(String password) {
		this.password = password;
	}

	public final Date getCreateTime() {
		return createTime;
	}

	public final void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public final Date getUpdateTime() {
		return updateTime;
	}

	public final void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", roleId=" + roleId + ", createTime=" + createTime + ", updateTime=" + updateTime + "]";
	}

}
