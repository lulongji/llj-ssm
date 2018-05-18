package com.llj.web.controller.base;

import com.llj.framework.log.Logger;
import com.llj.framework.utils.date.DateUtil;
import org.apache.shiro.SecurityUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 基类
 *
 * @author lu
 */
public class BaseController {

	protected Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 得到ModelAndView
	 */
	public ModelAndView getModelAndView() {
		return new ModelAndView();
	}

	/**
	 * 得到request对象
	 */
	public HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();

		return request;
	}

	public static void logBefore(Logger logger, String interfaceName, String declare, String interfaceParms) {
		String currentUserId = SecurityUtils.getSubject().getPrincipal() == null ? ""
				: SecurityUtils.getSubject().getPrincipal().toString();
		logger.info("StarTime==========>操作人账户：" + currentUserId);
		logger.info(interfaceName);
		logger.info(declare);
		logger.info(interfaceParms);
	}

	public static void logBefore(Logger logger, String interfaceName, String declare) {
		String currentUserId = SecurityUtils.getSubject().getPrincipal() == null ? ""
				: SecurityUtils.getSubject().getPrincipal().toString();
		logger.info("StarTime:" + DateUtil.getCurrentTime() + "==========>操作人账户：" + currentUserId);
		logger.info(interfaceName);
		logger.info(declare);
	}

	public static void logAfter(Logger logger) {
		String currentUserId = SecurityUtils.getSubject().getPrincipal() == null ? ""
				: SecurityUtils.getSubject().getPrincipal().toString();
		logger.info("EndTime==========>操作人账户：" + currentUserId);
	}

}
