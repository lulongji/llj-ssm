/**
 * 
 */
package com.llj.web.service.system.role.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.llj.web.dao.system.role.RoleDAO;
import com.llj.web.entity.system.Role;
import com.llj.web.entity.system.RolePage;
import com.llj.web.entity.system.UserRole;
import com.llj.web.service.system.role.RoleService;

/**
 * @author lu
 *
 */
@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleDAO roleDAO;

	@Override
	public void insertRole(Role role) throws Exception {
		roleDAO.insertRole(role);
	}

	@Override
	public void updateRole(Role role) throws Exception {
		roleDAO.updateRole(role);
	}

	@Override
	public void deleteRole(Role role) throws Exception {
		roleDAO.deleteRole(role);
	}

	@Override
	public Role queryRole(Role role) throws Exception {
		return roleDAO.queryRole(role);
	}

	@Override
	public List<Role> getRole(RolePage roleQuery) throws Exception {
		return roleDAO.getRole(roleQuery);
	}

	@Override
	public void insertUserRole(UserRole userRole) throws Exception {
		roleDAO.insertUserRole(userRole);
	}

	@Override
	public void deleteUserRole(UserRole userRole) throws Exception {
		roleDAO.deleteUserRole(userRole);
	}

}
