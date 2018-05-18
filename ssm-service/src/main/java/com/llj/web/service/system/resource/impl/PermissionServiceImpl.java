/**
 * 
 */
package com.llj.web.service.system.resource.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.llj.web.dao.system.resource.PermissionDAO;
import com.llj.web.entity.system.NodeList;
import com.llj.web.entity.system.Permission;
import com.llj.web.entity.system.User;
import com.llj.web.service.system.resource.PermissionService;

/**
 * @author lu
 *
 */
@Service
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	private PermissionDAO permissionDAO;

	@Override
	public List<String> getMenuPermission(User user) throws Exception {
		return permissionDAO.getMenuPermission(user);
	}

	@Override
	public List<Permission> getPermissionSelect(Permission permission) throws Exception {
		return permissionDAO.getPermissionSelect(permission);
	}

	@Override
	public List<Permission> getUserPermission(User user) throws Exception {
		return permissionDAO.getUserPermission(user);
	}

	@Override
	public void delPermissions(Permission permission) throws Exception {
		permissionDAO.delPermissions(permission);
	}

	@Override
	public void batchInsertPermissions(List<NodeList> list) throws Exception {
		permissionDAO.batchInsertPermissions(list);
	}

}
