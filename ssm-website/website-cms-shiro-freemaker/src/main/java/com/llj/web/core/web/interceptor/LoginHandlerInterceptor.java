package com.llj.web.core.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.llj.web.constants.SystemConstants;
import com.llj.web.shiro.AuthUtil;

/**
 * 登陆过滤
 *
 * @author lu
 */
public class LoginHandlerInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String path = request.getServletPath();
		if (!path.matches(SystemConstants.NO_INTERCEPTOR_PATH)) {
			if (AuthUtil.getCurrentUser() != null) {
				return true;
			} else {
				response.sendRedirect(request.getContextPath() + SystemConstants.LOGIN);
				return false;
			}
		} else {
			return true;
		}
	}
}
