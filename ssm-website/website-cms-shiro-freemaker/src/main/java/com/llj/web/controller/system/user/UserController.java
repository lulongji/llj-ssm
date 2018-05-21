package com.llj.web.controller.system.user;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.llj.framework.page.JsonResult;
import com.llj.framework.utils.MD5Utils;
import com.llj.web.constants.SystemConstants;
import com.llj.web.entity.system.RolePage;
import com.llj.web.entity.system.User;
import com.llj.web.entity.system.UserPage;
import com.llj.web.entity.system.UserRole;
import com.llj.web.service.system.role.RoleService;
import com.llj.web.service.system.user.UserService;

/**
 * 系统用户
 *
 * @author lu
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    /**
     * 日志
     */
    private static Logger logger = LogManager.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    /**
     * 查询所有用户信息
     *
     * @param queryObject
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getUser", produces = "application/json; charset=utf-8")
    public ModelAndView getUser(UserPage queryObject) throws Exception {
        ModelAndView mv = new ModelAndView();
        logger.info("系统-查询所有用户信息！");
        try {
            userService.getUser(queryObject);
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.addObject("page", queryObject);
        mv.setViewName("system/user/list");
        return mv;
    }

    /**
     * 返回添加用户界面
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/addUserPage", produces = "application/json; charset=utf-8")
    public ModelAndView addUserPage() throws Exception {
        return new ModelAndView("system/user/add");
    }

    /**
     * 返回修改用户界面
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/editUserPage", produces = "application/json; charset=utf-8")
    public ModelAndView editUserPage(String userName) throws Exception {
        ModelAndView mv = new ModelAndView();
        mv.addObject("userName", userName);
        mv.setViewName("system/user/edit");
        return mv;
    }

    /**
     * 查询单个用户信息
     *
     * @param request
     * @param username
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryUser", produces = "application/json; charset=utf-8")
    public ModelAndView queryUser(HttpServletRequest request, String username) throws Exception {
        logger.info("系统-查询单个用户信息！", "username=" + username);
        ModelAndView mv = new ModelAndView();
        JsonResult jsonResult = JsonResult.failure();
        try {
            User user = new User();
            user.setUserName(username);
            User userinfo = userService.queryUserInfo(user);
            jsonResult = JsonResult.success();
            jsonResult.setResult(userinfo);
        } catch (Exception e) {
            logger.error(e.toString(), e);
            jsonResult.setInfo(e.getMessage());
        }
        mv.addObject("JsonResult", jsonResult);
        mv.setViewName("system/user/list");
        return mv;
    }

    /**
     * 添加用户信息
     *
     * @param request
     * @param username
     * @param password
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/addUser", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult addUser(HttpServletRequest request, String username, String password) throws Exception {
        logger.info("系统-添加用户信息:", "username=" + username, ",password=" + password);
        JsonResult jsonResult = JsonResult.failure();
        try {
            User user = new User();
            user.setUserName(username);
            user.setPassword(MD5Utils.String2MD5(password));
            userService.insertUser(user);
            jsonResult = JsonResult.success();

        } catch (Exception e) {
            logger.error(e.toString(), e);
            jsonResult.setInfo(e.getMessage());
        }
        return jsonResult;
    }

    /**
     * 修改用户信息
     *
     * @param request
     * @param username
     * @param password
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/modifyUser", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult modifyUser(HttpServletRequest request, String username, String password) throws Exception {
        logger.info("系统-修改用户信息:", "username=" + username, ",password=" + password);
        JsonResult jsonResult = JsonResult.failure();
        try {
            User user = new User();
            user.setUserName(username);
            user.setPassword(MD5Utils.String2MD5(password));
            userService.updateUser(user);
            jsonResult = JsonResult.success();
        } catch (Exception e) {
            logger.error(e.toString(), e);
            jsonResult.setInfo(e.getMessage());
        }
        return jsonResult;
    }

    @RequestMapping(value = "/delUser")
    @ResponseBody
    public JsonResult delUser(HttpServletRequest request, String username) throws Exception {
        logger.info("系统-删除用户信息:", "username=" + username);
        JsonResult jsonResult = JsonResult.failure();
        try {
            User user = new User();
            user.setUserName(username);
            userService.deleteUser(user);
            jsonResult = JsonResult.success();
        } catch (Exception e) {
            logger.error(e.toString(), e);
            jsonResult.setInfo(e.getMessage());
        }
        return jsonResult;
    }

    /**
     * 获取角色信息
     *
     * @param userName
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/authorizeModal")
    public ModelAndView authorizeModal(String userName, Integer userId, Integer roleId) throws Exception {
        ModelAndView mv = new ModelAndView();
        logger.info("系统-获取角色信息！", "userName=" + userName);
        try {
            RolePage roleQuery = new RolePage();
            roleQuery.setPageNo(1);
            roleQuery.setPageSize(100000);
            roleQuery.setUserName(userName);
            roleService.getRole(roleQuery);
            mv.addObject("userId", userId);
            mv.addObject("roleId", roleId);
            mv.addObject("roleList", roleQuery.getQueryList());
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.setViewName("system/user/user_authorize");
        return mv;

    }

    /**
     * 添加用户角色信息
     *
     * @param request
     * @param roleId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/addUserRole", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult addUserRole(HttpServletRequest request, int roleId, int userId) throws Exception {
        logger.info("系统-添加用户角色信息:", "roleId=" + roleId, "userId=" + userId);
        JsonResult jsonResult = JsonResult.success();
        try {
            UserRole userRole = new UserRole();
            userRole.setUserId(userId);
            roleService.deleteUserRole(userRole);
            userRole.setRoleId(roleId);
            userRole.setStatus(SystemConstants.STATUS_VALUE_OPEN);
            roleService.insertUserRole(userRole);
        } catch (Exception e) {
            jsonResult = JsonResult.failure();
            logger.error(e.toString(), e);
            jsonResult.setInfo(e.getMessage());
        }
        return jsonResult;
    }

}
