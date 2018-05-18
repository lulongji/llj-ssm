package com.llj.web.core.web.interceptor.shiro;

import java.util.List;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.llj.web.entity.system.User;
import com.llj.web.service.system.resource.PermissionService;
import com.llj.web.shiro.AuthUtil;

/**
 * shiroRealm 重写权限过滤
 *
 * @author lu
 */
public class ShiroRealm extends AuthorizingRealm {

	@Autowired
	private PermissionService permissionService;

	/**
	 * 登录信息和用户验证信息验证(non-Javadoc)
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		String username = (String) token.getPrincipal(); // 得到用户名
		String password = new String((char[]) token.getCredentials()); // 得到密码

		if (null != username && null != password) {
			return new SimpleAuthenticationInfo(username, password, getName());
		} else {
			return null;
		}

	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用,负责在应用程序中决定用户的访问控制的方法(non-Javadoc)
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection pc) {
		User user = AuthUtil.getCurrentUser();
		SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
		simpleAuthorInfo.addStringPermissions(getPermCodes(user));
		return simpleAuthorInfo;

	}

	/**
	 * 获取权限，string存放的是权限编码
	 *
	 * @param user
	 * @return
	 */
	private List<String> getPermCodes(User user) {
		try {
			return permissionService.getMenuPermission(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
