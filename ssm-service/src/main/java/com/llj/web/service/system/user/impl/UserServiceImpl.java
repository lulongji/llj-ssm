/**
 * 
 */
package com.llj.web.service.system.user.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.llj.web.dao.system.user.UserDAO;
import com.llj.web.entity.system.User;
import com.llj.web.entity.system.UserPage;
import com.llj.web.service.system.user.UserService;

/**
 * @author lu
 *
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAO userDAO;

	@Override
	public void insertUser(User user) throws Exception {
		userDAO.insertUser(user);
	}

	@Override
	public void updateUser(User user) throws Exception {
		userDAO.updateUser(user);
	}

	@Override
	public void deleteUser(User user) throws Exception {
		userDAO.deleteUser(user);
	}

	@Override
	public User queryUser(User user) throws Exception {
		return userDAO.queryUser(user);
	}

	@Override
	public List<User> getUser(UserPage queryObject) throws Exception {
		return userDAO.getUser(queryObject);
	}

	@Override
	public void updateTime(User user) throws Exception {
		userDAO.updateTime(user);
	}

	@Override
	public User queryUserInfo(User user) throws Exception {
		return userDAO.queryUserInfo(user);
	}

}
