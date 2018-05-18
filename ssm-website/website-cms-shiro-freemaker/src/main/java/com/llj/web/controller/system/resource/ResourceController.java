/**
 *
 */
package com.llj.web.controller.system.resource;

import java.util.ArrayList;
import java.util.Iterator;
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
import com.llj.web.entity.system.Menu;
import com.llj.web.entity.system.Permission;
import com.llj.web.entity.system.ZtreeNodes;
import com.llj.web.entity.system.dict.DictValue;
import com.llj.web.service.system.dict.DictService;
import com.llj.web.service.system.resource.MenuService;
import com.llj.web.service.system.resource.PermissionService;

/**
 * @author lu
 */
@Controller
@RequestMapping("/resource")
public class ResourceController {
    /**
     * 日志
     */
    private static Logger logger = LogManager.getLogger(ResourceController.class.getName());

    @Autowired
    private MenuService menuService;

    @Autowired
    private DictService dictService;

    @Autowired
    private PermissionService permissionService;

    /**
     * 查询所有一级菜单信息
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMenu", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ModelAndView getMenu() throws Exception {
        ModelAndView mv = new ModelAndView();
        logger.info("系统-查询所有一级菜单信息！");
        try {
            List<Menu> menuList = menuService.getMenu();
            mv.addObject("menuList", menuList);
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.setViewName("system/resource/list");
        return mv;
    }

    /**
     * 查询所有菜单权限节点
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMenuAll", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult getMenuAll(int roleId) throws Exception {
        JsonResult result = JsonResult.success();
        logger.info("系统-查询所有菜单权限节点！");
        try {
            List<ZtreeNodes> ztreeNodesList = menuService.getMenuAll();
            Permission permission = new Permission();
            permission.setRoleId(roleId);
            List<Permission> list = permissionService.getPermissionSelect(permission);
            if (list != null && list.size() > 0) {
                for (ZtreeNodes z : ztreeNodesList) {
                    for (Permission p : list) {
                        if (z.getId() == p.getPermissionId()) {
                            z.setChecked(true);
                            z.setOpen(true);
                        }
                    }
                }
            }
            result.setJsonResult(ztreeNodesList);
        } catch (Exception e) {
            logger.info("系统-查询所有菜单权限节点异常！");
            result = JsonResult.failure();
            logger.error(e.toString(), e);
        }
        return result;
    }

    /**
     * 根据父id查询菜单树结构
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMenuTree" + "", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult getMenuTree(int id) throws Exception {
        JsonResult result = JsonResult.success();
        logger.info("系统-根据父id查询菜单树结构！");
        try {
            Menu menu = new Menu();
            menu.setParentId(id);
            List<Menu> menuList = menuService.getMenuTree(menu);
            result.setJsonResult(menuList);
        } catch (Exception e) {
            result = JsonResult.failure();
            logger.error(e.toString(), e);
        }
        return result;
    }

    /**
     * 添加页面信息展示
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/addMenuModal", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ModelAndView addMenuModal(int id) throws Exception {
        ModelAndView mv = new ModelAndView();
        logger.info("系统-添加菜单信息，查询菜单树名称！");
        try {

            DictValue dictValue = new DictValue();
            dictValue.setCategoryCode(SystemConstants.DICT_RESOURCE);
            List<DictValue> dictList = dictService.getDictValue(dictValue);
            mv.addObject("dictList", dictList);
            DictValue dictValue1 = new DictValue();
            dictValue1.setName("按钮");
            List<DictValue> dict = dictService.getDictValue(dictValue1);
            Menu menu = new Menu();
            menu.setResourcesType(dict.get(0).getId().toString());
            menu.setParentId(id);
            List<Menu> menuList = menuService.getMenuNameAll(menu);
            mv.addObject("menuList", menuList);
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.setViewName("system/resource/add");
        return mv;
    }

    /**
     * 添加菜单
     *
     * @param request
     * @param permissionName
     * @param url
     * @param parentId
     * @param resourcesType
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/addMenu", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult addMenu(HttpServletRequest request, String permissionName, String url, int parentId,
                              String resourcesType, String permissionCode, int sortNum) throws Exception {
        logger.info("系统--添加菜单:", "permissionName=" + permissionName, ",url=" + url, ",parentId=" + parentId,
                ",resourcesType=" + resourcesType, ",permissionCode=" + permissionCode);
        JsonResult result = JsonResult.failure();
        try {
            Menu menu = new Menu();
            menu.setPermissionName(permissionName);
            menu.setUrl(url);
            menu.setParentId(parentId);
            menu.setResourcesType(resourcesType);
            menu.setPermissionStatus(SystemConstants.STATUS_VALUE_OPEN);
            menu.setPermissionCode(permissionCode);
            menu.setSortNum(sortNum);
            menuService.addMenu(menu);
            result = JsonResult.success();
        } catch (Exception e) {
            logger.error(e.toString(), e);
            result.setInfo(e.getMessage());
        }
        return result;
    }

    /**
     * 修改页面信息展示
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/editMenuModal", produces = "application/json; charset=utf-8")
    public ModelAndView editMenuModal(String permissionName, String url, int id, String permissionCode, int parentId,
                                      String resourcesType, int sortNum) throws Exception {
        ModelAndView mv = new ModelAndView();
        Menu menu = new Menu();
        logger.info("系统-修改页面信息展示！");
        try {
            mv.addObject("id", id);
            mv.addObject("permissionName", permissionName);
            mv.addObject("permissionCode", permissionCode);
            mv.addObject("parentId", parentId);
            mv.addObject("resourcesType", resourcesType);
            mv.addObject("url", url);
            mv.addObject("sortNum", sortNum);
            menu.setId(id);
            DictValue dictValue1 = new DictValue();
            dictValue1.setName("按钮");
            List<DictValue> dict = dictService.getDictValue(dictValue1);
            menu.setResourcesType(dict.get(0).getId().toString());
            List<Menu> menuList = menuService.getMenuName(menu);
            mv.addObject("menuList", menuList);
            DictValue dictValue = new DictValue();
            dictValue.setCategoryCode(SystemConstants.DICT_RESOURCE);
            List<DictValue> dictList = dictService.getDictValue(dictValue);
            mv.addObject("dictList", dictList);
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.setViewName("system/resource/edit");
        return mv;

    }

    /**
     * 修改资源菜单信息
     *
     * @param request
     * @param id
     * @param permissionName
     * @param url
     * @param parentId
     * @param resourcesType
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/modifyMenu", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult modifyMenu(HttpServletRequest request, int id, String permissionName, String url, int parentId,
                                 String resourcesType, String permissionCode, int sortNum) throws Exception {
        logger.info("系统-修改菜单信息:", "id=" + id, "permissionName=" + permissionName, ",url=" + url,
                ",parentId=" + parentId, ",resourcesType=" + resourcesType, "permissionCode=" + permissionCode);
        JsonResult result = JsonResult.failure();
        try {
            Menu menu = new Menu();
            menu.setId(id);
            menu.setPermissionName(permissionName);
            menu.setPermissionCode(permissionCode);
            menu.setUrl(url);
            menu.setParentId(parentId);
            menu.setResourcesType(resourcesType);
            menu.setSortNum(sortNum);
            menuService.updateMenu(menu);
            result = JsonResult.success();
        } catch (Exception e) {
            logger.error(e.toString(), e);
            result.setInfo(e.getMessage());
        }
        return result;
    }

    /**
     * 删除资源菜单信息以及子菜单信息
     *
     * @param request
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/delMenu", produces = "application/json; charset=utf-8")
    @ResponseBody
    public JsonResult delMenu(HttpServletRequest request, int id) throws Exception {
        logger.info("系统-删除资源菜单信息以及子菜单信息:", "id=" + id);
        JsonResult result = JsonResult.failure();
        try {
            Menu menu = new Menu();
            menu.setId(id);
            menuService.deleteMenu(menu);
            result = JsonResult.success();
        } catch (Exception e) {
            logger.error(e.toString(), e);
            result.setInfo(e.getMessage());
        }
        return result;
    }

    /**
     * 查询菜单树全部节点
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMenuTreeAll" + "", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ModelAndView getMenuTreeAll() throws Exception {
        ModelAndView mv = new ModelAndView();
        logger.info("系统-查询菜单树全部节点！");
        try {
            DictValue dictValue = new DictValue();
            dictValue.setName("按钮");
            List<DictValue> dict = dictService.getDictValue(dictValue);
            Menu menu = new Menu();
            menu.setResourcesType(dict.get(0).getId().toString());
            List<Menu> menuList = menuService.getMenuTreeAll(menu);
            List<Menu> menuParent = menuService.getMenu();
            mv.addObject("menuList", getMenuTreeList(menuList, menuParent));
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
        mv.setViewName("common/compose/left");
        return mv;
    }

    /**
     * 递归查询菜单节点树
     *
     * @param menuList
     * @param menuParent
     * @return
     */
    private List<Menu> getMenuTreeList(List<Menu> menuList, List<Menu> menuParent) {

        List<Menu> menuJson = new ArrayList<>();
        for (Menu m : menuParent) {
            if (hasChild(menuList, m.getId())) {
                m.setChildrenList(getChildList(menuList, m.getId()));
                this.getMenuTreeList(menuList, getChildList(menuList, m.getId()));
            }
            menuJson.add(m);
        }
        return menuJson;
    }

    /**
     * 得到子节点列表
     *
     * @param list
     * @param pid
     * @return
     */
    private List<Menu> getChildList(List<Menu> list, int pid) {
        List<Menu> nodeList = new ArrayList<Menu>();
        Iterator<Menu> it = list.iterator();
        while (it.hasNext()) {
            Menu n = it.next();
            if (n.getParentId() == pid) {
                nodeList.add(n);
            }
        }
        return nodeList;
    }

    /**
     * 判断是否有子节点
     *
     * @param list
     * @param pid
     * @return
     */
    private boolean hasChild(List<Menu> list, int pid) {
        return getChildList(list, pid).size() > 0;
    }
}
