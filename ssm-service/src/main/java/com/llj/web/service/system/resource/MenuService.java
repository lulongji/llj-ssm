/**
 * 
 */
package com.llj.web.service.system.resource;

import java.util.List;

import com.llj.web.entity.system.Menu;
import com.llj.web.entity.system.ZtreeNodes;

/**
 * @author lu
 *
 */
public interface MenuService {

	/**
	 * 查询所有菜单权限节点
	 * 
	 * @return
	 * @throws Exception
	 */
	List<ZtreeNodes> getMenuAll() throws Exception;

	/**
	 * 查询所有一级菜单信息
	 * 
	 * @return
	 * @throws Exception
	 */
	List<Menu> getMenu() throws Exception;

	/**
	 * 根绝父id查询菜单树
	 * 
	 * @param menu
	 * @return
	 * @throws Exception
	 */
	List<Menu> getMenuTree(Menu menu) throws Exception;

	/**
	 * 查询不包含子集的菜单名称
	 * 
	 * @param menu
	 * @return
	 * @throws Exception
	 */
	List<Menu> getMenuName(Menu menu) throws Exception;

	/**
	 * 查询所有名称
	 * 
	 * @param menu
	 * @return
	 * @throws Exception
	 */
	List<Menu> getMenuNameAll(Menu menu) throws Exception;

	/**
	 * 添加菜单
	 * 
	 * @param menu
	 * @throws Exception
	 */
	void addMenu(Menu menu) throws Exception;

	/**
	 * 修改菜单信息
	 * 
	 * @param menu
	 * @throws Exception
	 */
	void updateMenu(Menu menu) throws Exception;

	/**
	 * 删除菜单
	 * 
	 * @param menu
	 * @throws Exception
	 */
	void deleteMenu(Menu menu) throws Exception;

	/**
	 * 查询所有菜单数据
	 * 
	 * @return
	 * @throws Exception
	 */
	List<Menu> getMenuTreeAll(Menu menu) throws Exception;

}
