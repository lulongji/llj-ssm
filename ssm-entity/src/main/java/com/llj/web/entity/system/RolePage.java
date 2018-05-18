/**
 * 
 */
package com.llj.web.entity.system;

import com.llj.framework.page.Page;

/**
 * @author lu
 *
 */
public class RolePage extends Page<Role> {

	private String roleName;
	private String userName;

	public final String getRoleName() {
		return roleName;
	}

	public final void setRoleName(String roleName) {
		this.roleName = roleName;

	}

	public final String getUserName() {
		return userName;
	}

	public final void setUserName(String userName) {
		this.userName = userName;
	}

}
