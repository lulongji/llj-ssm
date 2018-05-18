package com.llj.web.constants;

/**
 * 系统常量类
 *
 * @author lu
 * @version 1.0.0
 */
public interface SystemConstants {

	/**
	 * 登陆过滤 不对匹配该值的访问路径拦截（正则）
	 */
	String NO_INTERCEPTOR_PATH = ".*/((login)|(logout)|(loginPage)|(res)|(upload)|(api)|(dict)|(redis)).*";

	/**
	 * 登录地址
	 */
	String LOGIN = "/login/login";

	/**
	 * 资源标签
	 */
	String DICT_RESOURCE = "RESOURCE";

	/**
	 * 通用状态 1，启用 2 停用
	 */
	String STATUS_VALUE_OPEN = "1";
	String STATUS_VALUE_CLOSE = "2";
}
