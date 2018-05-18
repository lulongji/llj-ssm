/**
 *
 */
package com.llj.web.service.system.resource;

import java.util.List;

import com.llj.web.entity.system.NodeList;
import com.llj.web.entity.system.Permission;
import com.llj.web.entity.system.User;

/**
 * 权限
 *
 * @author lu
 */
public interface PermissionService {

    /**
     * 根据角色获取权限
     *
     * @param permission
     * @return
     * @throws Exception
     */
    List<Permission> getPermissionSelect(Permission permission) throws Exception;

    /**
     * 获取角色权限编码
     *
     * @param user
     * @return
     * @throws Exception
     */
    List<String> getMenuPermission(User user) throws Exception;

    /**
     * 获取用户角色
     *
     * @param user
     * @throws Exception
     */
    List<Permission> getUserPermission(User user) throws Exception;

    /**
     * 删除授权信息
     *
     * @param permission
     * @throws Exception
     */
    void delPermissions(Permission permission) throws Exception;

    /**
     * 批量插入授权信息
     *
     * @param list
     * @throws Exception
     */
    void batchInsertPermissions(List<NodeList> list) throws Exception;

}
