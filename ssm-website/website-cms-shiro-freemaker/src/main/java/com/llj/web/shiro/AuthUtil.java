/**
 * 
 */
package com.llj.web.shiro;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.llj.framework.constants.StatusCode;
import com.llj.web.entity.system.Menu;
import com.llj.web.entity.system.User;

/**
 * 用户公共类
 * 
 * @author lu
 *
 */
public class AuthUtil {

	/**
	 * 获取当前用户
	 * 
	 * @return
	 */
	public static User getCurrentUser() {
		Subject sub = SecurityUtils.getSubject();
		Session session = sub.getSession();
		User user = (User) session.getAttribute(StatusCode.SESSION_USER);
		return user;
	}

	/**
	 * 在用户中获取权限信息
	 * 
	 * @return
	 */
	public static List<Menu> getCurrentUserPermissions() {
		return null;

	}

}