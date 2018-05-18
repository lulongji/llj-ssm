package com.llj.web.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

/**
 * 权限处理
 * 
 * @author:lu
 */
@SuppressWarnings("unused")
public class Jurisdiction {

	/**
	 * 访问权限及初始化按钮权限(控制按钮的显示)
	 * 
	 * @param menuUrl
	 *            菜单路径
	 * @return
	 */

	public static boolean hasJurisdiction(String menuUrl) {
		// 判断是否拥有当前点击菜单的权限（内部过滤,防止通过url进入跳过菜单权限）
		/**
		 * 根据点击的菜单的xxx.do去菜单中的URL去匹配，当匹配到了此菜单，判断是否有此菜单的权限，没有的话跳转到404页面
		 * 根据按钮权限，授权按钮(当前点的菜单和角色中各按钮的权限匹对)
		 */
		// shiro管理的session
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		Boolean b = true;

		// 权限处理
		// if(){
		//
		// }
		return true;

	}

	/**
	 * 按钮权限(方法中校验)
	 * 
	 * @param menuUrl
	 *            菜单路径
	 * @param type
	 *            类型(add、del、edit、cha)
	 * @return
	 */
	public static boolean buttonJurisdiction(String menuUrl, String type) {
		// 判断是否拥有当前点击菜单的权限（内部过滤,防止通过url进入跳过菜单权限）
		/**
		 * 根据点击的菜单的xxx.do去菜单中的URL去匹配，当匹配到了此菜单，判断是否有此菜单的权限，没有的话跳转到404页面
		 * 根据按钮权限，授权按钮(当前点的菜单和角色中各按钮的权限匹对)
		 */
		// shiro管理的session
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		Boolean b = true;

		// 权限处理
		// if(){
		//
		// }
		return true;
	}

}
