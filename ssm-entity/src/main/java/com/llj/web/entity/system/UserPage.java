package com.llj.web.entity.system;

import com.llj.framework.page.Page;

public class UserPage extends Page<User> {
	private String userName;

	public final String getUserName() {
		return userName;
	}

	public final void setUserName(String userName) {
		this.userName = userName;
	}

}
