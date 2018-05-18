/**
 * 
 */
package com.llj.web.entity.system;

import java.util.List;

/**
 * 菜单
 * 
 * @author lu
 *
 */
public class Menu {

	private int id;
	private String permissionName;// 资源名称
	private String permissionCode;// 资源编码
	private String url;
	private String permissionStatus;// 权限状态(1:启用 2:禁用)
	private int parentId;// 父级id
	private int sortNum;// 排序
	private String resourcesType;// 资源类别
	private List<Menu> childrenList;

	public final int getSortNum() {
		return sortNum;
	}

	public final void setSortNum(int sortNum) {
		this.sortNum = sortNum;
	}

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final String getPermissionName() {
		return permissionName;
	}

	public final void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}

	public final String getPermissionCode() {
		return permissionCode;
	}

	public final void setPermissionCode(String permissionCode) {
		this.permissionCode = permissionCode;
	}

	public final String getUrl() {
		return url;
	}

	public final void setUrl(String url) {
		this.url = url;
	}

	public final String getPermissionStatus() {
		return permissionStatus;
	}

	public final void setPermissionStatus(String permissionStatus) {
		this.permissionStatus = permissionStatus;
	}

	public final int getParentId() {
		return parentId;
	}

	public final void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public final String getResourcesType() {
		return resourcesType;
	}

	public final void setResourcesType(String resourcesType) {
		this.resourcesType = resourcesType;
	}

	public final List<Menu> getChildrenList() {
		return childrenList;
	}

	public final void setChildrenList(List<Menu> childrenList) {
		this.childrenList = childrenList;
	}

}
