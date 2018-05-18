/**
 * 
 */
package com.llj.web.dao.system.user;

import java.util.List;

import com.llj.web.entity.system.User;
import com.llj.web.entity.system.UserPage;

/**
 * @author lu
 *
 */
public interface UserDAO {

	void insertUser(User user) throws Exception;

	void updateUser(User user) throws Exception;

	void deleteUser(User user) throws Exception;

	User queryUser(User user) throws Exception;

	User queryUserInfo(User user) throws Exception;

	List<User> getUser(UserPage queryObject) throws Exception;

	void updateTime(User user) throws Exception;

}
