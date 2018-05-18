/**
 *
 */
package com.llj.web.controller.system.role;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.llj.framework.page.JsonResult;
import com.llj.web.constants.SystemConstants;
import com.llj.web.entity.system.NodeList;
import com.llj.web.entity.system.Permission;
import com.llj.web.entity.system.Role;
import com.llj.web.entity.system.RolePage;
import com.llj.web.entity.system.Roles;
import com.llj.web.service.system.resource.PermissionService;
import com.llj.web.service.system.role.RoleService;

/**
 * 角色
 *
 * @author lu
 */

@Controller
@RequestMapping("/role")
public class RoleController {

	/**
	 * 日志
	 */
	private static Logger logger = LogManager.getLogger(RoleController.class.getName());

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	/**
	 * 查询角色信息
	 *
	 * @param queryObject
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getRole", produces = "application/json; charset=utf-8")
	@ResponseBody
	public ModelAndView getMenu(RolePage queryObject) throws Exception {
		ModelAndView mv = new ModelAndView();
		logger.info("系统-查询角色信息！");
		try {
			roleService.getRole(queryObject);
			mv.addObject("page", queryObject);
		} catch (Exception e) {
			logger.error(e.toString(), e);
		}
		mv.setViewName("system/role/list");
		return mv;
	}

	/**
	 * 添加角色信息页面
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/addRoleModal", produces = "application/json; charset=utf-8")
	@ResponseBody
	public ModelAndView addRoleModal() throws Exception {
		ModelAndView mv = new ModelAndView();
		logger.info("系统-添加角色信息！");
		mv.setViewName("system/role/add");
		return mv;
	}

	/**
	 * 添加角色信息
	 *
	 * @param request
	 * @param roleName
	 * @param roleStatus
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/addRole")
	@ResponseBody
	public JsonResult addRole(HttpServletRequest request, String roleName, String roleStatus) throws Exception {
		logger.info("系统--添加角色:", "roleName=" + roleName, "roleStatus=" + roleStatus);
		JsonResult result = JsonResult.failure();
		try {
			Role role = new Role();
			role.setRoleName(roleName);
			role.setRoleStatus(roleStatus);
			roleService.insertRole(role);
			result = JsonResult.success();
		} catch (Exception e) {
			logger.error(e.toString(), e);
			result.setInfo(e.getMessage());
		}
		return result;
	}

	/**
	 * 编辑角色信息页面
	 *
	 * @param id
	 * @param roleName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/editRoleModal")
	public ModelAndView editRoleModal(int id, String roleName) throws Exception {
		ModelAndView mv = new ModelAndView();
		logger.info("系统-编辑角色信息！", "roleName=" + roleName, "id=" + id);
		try {
			mv.addObject("id", id);
			mv.addObject("roleName", roleName);
		} catch (Exception e) {
			logger.error(e.toString(), e);
		}
		mv.setViewName("system/role/edit");
		return mv;

	}

	/**
	 * 修改角色信息
	 *
	 * @param request
	 * @param id
	 * @param roleName
	 * @param roleStatus
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/modifyRoleInfo")
	@ResponseBody
	public JsonResult modifyRoleInfo(HttpServletRequest request, int id, String roleName, String roleStatus)
			throws Exception {
		logger.info("系统-修改角色信息:", "id=" + id, "roleName=" + roleName, ",roleStatus=" + roleStatus);
		JsonResult result = JsonResult.failure();
		try {
			Role role = new Role();
			role.setId(id);
			role.setRoleName(roleName);
			role.setRoleStatus(roleStatus);
			roleService.updateRole(role);
			result = JsonResult.success();
		} catch (Exception e) {
			logger.error(e.toString(), e);
			result.setInfo(e.getMessage());
		}
		return result;
	}

	/**
	 * 删除角色信息,删除授权信息
	 *
	 * @param request
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/delRole")
	@ResponseBody
	public JsonResult delRole(HttpServletRequest request, int id) throws Exception {
		logger.info("系统-删除角色信息:", "id=" + id);
		JsonResult result = JsonResult.failure();
		try {
			Role role = new Role();
			role.setId(id);
			roleService.deleteRole(role);
			Permission permission = new Permission();
			permission.setRoleId(id);
			permissionService.delPermissions(permission);
			result = JsonResult.success();
		} catch (Exception e) {
			logger.error(e.toString(), e);
			result.setInfo(e.getMessage());
		}
		return result;
	}

	/**
	 * 角色授权信息
	 *
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/addAuthorizeRoleModal")
	public ModelAndView addAuthorizeRoleModal(int id) throws Exception {
		ModelAndView mv = new ModelAndView();
		logger.info("系统-角色授权！", "id=" + id);
		try {
			mv.addObject("roleId", id);
		} catch (Exception e) {
			logger.error(e.toString(), e);
			logger.error("系统-角色授权失败！");
		}
		mv.setViewName("system/role/ztree");
		return mv;

	}

	/**
	 * 添加角色授权
	 *
	 * @param request
	 * @param roleId
	 * @param permissions
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/addAuthorizeRole")
	@ResponseBody
	public JsonResult addAuthorizeRole(HttpServletRequest request, int roleId, String permissions) throws Exception {
		logger.info("系统--添加角色授权:", "roleId=" + roleId, "permissions=" + permissions);
		JsonResult result = JsonResult.failure();
		List<NodeList> list = new ArrayList<>();
		Permission permission = new Permission();
		try {

			permission.setRoleId(roleId);
			permissionService.delPermissions(permission);
			permission.setStatus(SystemConstants.STATUS_VALUE_OPEN);
			String[] ary = permissions.split(",");
			for (String s : ary) {
				NodeList n = new NodeList();
				Roles roles = new Roles();
				roles.setPermissionId(Integer.parseInt(s));
				n.setRole(roles);
				n.setPermission(permission);
				list.add(n);
			}
			permissionService.batchInsertPermissions(list);
			result = JsonResult.success();
		} catch (Exception e) {
			logger.error(e.toString(), e);
			result.setInfo(e.getMessage());
		}
		return result;
	}

}
