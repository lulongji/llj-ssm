package com.llj.web.controller.system;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * 系统首页
 * 
 * @author lu
 */
@RestController
@RequestMapping(value = "/index")
public class IndexController {

	/** 日志 */
	private static Logger logger = LogManager.getLogger(IndexController.class.getName());

	/**
	 * 查询所有用户信息
	 * 
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getIndexPage", produces = "application/json; charset=utf-8")
	public ModelAndView getIndexPage() throws Exception {
		ModelAndView mv = new ModelAndView();
		logger.info("系统-跳转body页！");
		try {
		} catch (Exception e) {
			logger.error(e.toString(), e);
		}
		mv.setViewName("common/compose/body");
		return mv;
	}

}
