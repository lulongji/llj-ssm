/**
 * 
 */
package com.llj.web.service.system.resource.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.llj.web.dao.system.resource.MenuDAO;
import com.llj.web.entity.system.Menu;
import com.llj.web.entity.system.ZtreeNodes;
import com.llj.web.service.system.resource.MenuService;

/**
 * @author lu
 *
 */
@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuDAO menuDAO;

	@Override
	public List<ZtreeNodes> getMenuAll() throws Exception {
		return menuDAO.getMenuAll();
	}

	@Override
	public List<Menu> getMenu() throws Exception {
		return menuDAO.getMenu();
	}

	@Override
	public List<Menu> getMenuTree(Menu menu) throws Exception {
		return menuDAO.getMenuTree(menu);
	}

	@Override
	public List<Menu> getMenuName(Menu menu) throws Exception {
		return menuDAO.getMenuName(menu);
	}

	@Override
	public List<Menu> getMenuNameAll(Menu menu) throws Exception {
		return menuDAO.getMenuNameAll(menu);
	}

	@Override
	public void addMenu(Menu menu) throws Exception {
		menuDAO.addMenu(menu);

	}

	@Override
	public void updateMenu(Menu menu) throws Exception {
		menuDAO.updateMenu(menu);
	}

	@Override
	public void deleteMenu(Menu menu) throws Exception {
		menuDAO.deleteMenu(menu);

	}

	@Override
	public List<Menu> getMenuTreeAll(Menu menu) throws Exception {
		return menuDAO.getMenuTreeAll(menu);
	}

}
