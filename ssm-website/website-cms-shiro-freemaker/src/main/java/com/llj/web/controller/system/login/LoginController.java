package com.llj.web.controller.system.login;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.llj.framework.constants.StatusCode;
import com.llj.framework.page.JsonResult;
import com.llj.framework.utils.MD5Utils;
import com.llj.web.entity.system.User;
import com.llj.web.service.system.user.UserService;

/**
 * 后台登陆
 *
 * @author lu
 * @version v1.0
 */

@RestController
@RequestMapping("/login")
public class LoginController {
    /**
     * 日志
     */
    private static Logger logger = LogManager.getLogger(LoginController.class.getName());

    @Autowired
    private UserService userService;

    User user;

    /**
     * 登陆页面
     *
     * @return
     */
    @RequestMapping(value = "/loginPage", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ModelAndView loginPage() {
        logger.info("跳转到登陆页面！");
        ModelAndView mv = new ModelAndView();
        try {
            mv.setViewName("system/login/login");
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        return mv;
    }

    /**
     * 登录验证
     *
     * @param request  用户名
     * @param password 密码
     * @return
     * @throws Exception
     */
    @RequestMapping("/login")
    @ResponseBody
    public JsonResult login(HttpServletRequest request, String username, String password) throws Exception {
        JsonResult result = JsonResult.success();
        String errInfo = null;
        if (!StringUtils.isEmpty(username) || !StringUtils.isEmpty(password) || username != null || password != null) {
            try {
                // shiro管理的session
                Subject currentUser = SecurityUtils.getSubject();
                Session session = currentUser.getSession();

                // 删除session
                session.removeAttribute(StatusCode.SESSION_USER);

                // 根据username 查询数据库信息
                user = new User();
                user.setUserName(username);
                user.setPassword(MD5Utils.String2MD5(password));
                User userInfo = userService.queryUser(user);
                if (userInfo != null) {
                    // 获取当前时间 并更新数据库登陆时间
                    user.setUpdateTime(new Date());
                    userService.updateTime(user);
                    // 插入session 信息
                    session.setAttribute(StatusCode.SESSION_USER, user);
                    // shiro加入身份验证
                    Subject subject = SecurityUtils.getSubject();
                    UsernamePasswordToken token = new UsernamePasswordToken(username, password);
                    try {
                        subject.login(token);
                    } catch (AuthenticationException e) {
                        errInfo = "身份验证失败！";
                        result = JsonResult.failure();
                    }
                    if (errInfo == null) {
                        errInfo = "登陆成功!";
                        result = JsonResult.success();
                    }
                } else {
                    errInfo = "用户名或者密码错误！";
                    result = JsonResult.failure();
                }

            } catch (Exception e) {
                result = JsonResult.failure();
                result.setInfo(e.getMessage());
                logger.error(e.toString(), e);
            }
        } else {
            errInfo = "用户名或者密码为空！";
            result = JsonResult.failure();
        }
        result.setResult(errInfo);
        return result;
    }

    /**
     * 访问系统首页
     */
    @RequestMapping(value = "/main")
    public ModelAndView login_index(HttpServletRequest request, String changeMenu) {
        ModelAndView mv = new ModelAndView();
        try {
            // shiro管理的session
            Subject currentUser = SecurityUtils.getSubject();
            Session session = currentUser.getSession();
            User user = (User) session.getAttribute(StatusCode.SESSION_USER);
            if (user != null) {
                mv.setViewName("system/index");
            } else {
                mv.setViewName("system/login/login");
            }
        } catch (Exception e) {
            mv.setViewName("system/login/login");
            logger.error(e.getMessage(), e);
        }
        return mv;
    }

    /**
     * 用户注销
     *
     * @return
     */
    @RequestMapping(value = "/logout")
    @ResponseBody
    public JsonResult logout() {
        logger.info("用户注销登陆！");
        JsonResult result = JsonResult.success();
        try {
            Subject currentUser = SecurityUtils.getSubject();
            Session session = currentUser.getSession();
            session.removeAttribute(StatusCode.SESSION_USER);
            // shiro销毁登录
            Subject subject = SecurityUtils.getSubject();
            subject.logout();

        } catch (Exception e) {
            result = JsonResult.failure();
            logger.error(e.toString(), e);
        }
        return result;
    }
}
