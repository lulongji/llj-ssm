/**
 * 
 */
package com.llj.web.service.system.user;

import java.util.List;

import com.llj.web.entity.system.User;
import com.llj.web.entity.system.UserPage;

/**
 * @author lu
 *
 */
public interface UserService {

	/**
	 * 添加用户
	 * 
	 * @param user
	 *            用户实体类的对象
	 * @return
	 * @throws Exception
	 */
	void insertUser(User user) throws Exception;

	/**
	 * 修改用户
	 * 
	 * @param user
	 * @throws Exception
	 */
	void updateUser(User user) throws Exception;

	/**
	 * 删除用户
	 * 
	 * @param user
	 * @throws Exception
	 */
	void deleteUser(User user) throws Exception;

	/**
	 * 根据用户名密码查询单个用户
	 * 
	 * @param user
	 * @return
	 * @throws Exception
	 */
	User queryUser(User user) throws Exception;

	/**
	 * 根据用户名查询单个用户
	 * 
	 * @param user
	 * @return
	 * @throws Exception
	 */
	User queryUserInfo(User user) throws Exception;

	/**
	 * 查询所有用户
	 * 
	 * @return
	 * @throws Exception
	 */
	List<User> getUser(UserPage queryObject) throws Exception;

	/**
	 * 更新时间
	 * 
	 * @param user
	 * @throws Exception
	 */
	void updateTime(User user) throws Exception;

}
