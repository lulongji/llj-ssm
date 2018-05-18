/**
 *
 */
package com.llj.web.dao.system.role;

import java.util.List;

import com.llj.web.entity.system.Role;
import com.llj.web.entity.system.RolePage;
import com.llj.web.entity.system.UserRole;

/**
 * @author lu
 */
public interface RoleDAO {
    /**
     * 插入角色信息
     *
     * @param role
     * @throws Exception
     */
    void insertRole(Role role) throws Exception;

    /**
     * 修改角色信息
     *
     * @param role
     * @throws Exception
     */
    void updateRole(Role role) throws Exception;

    /**
     * 删除角色信息
     *
     * @param role
     * @throws Exception
     */
    void deleteRole(Role role) throws Exception;

    /**
     * 查询单个角色信息
     *
     * @param role
     * @return
     * @throws Exception
     */
    Role queryRole(Role role) throws Exception;

    /**
     * 查询所有角色信息
     *
     * @param roleQuery
     * @return
     * @throws Exception
     */
    List<Role> getRole(RolePage roleQuery) throws Exception;

    /**
     * 插入用户角色信息
     *
     * @param userRole
     * @throws Exception
     */
    void insertUserRole(UserRole userRole) throws Exception;

    /**
     * 删除用户授权的角色信息
     *
     * @param userRole
     * @throws Exception
     */
    void deleteUserRole(UserRole userRole) throws Exception;
}
