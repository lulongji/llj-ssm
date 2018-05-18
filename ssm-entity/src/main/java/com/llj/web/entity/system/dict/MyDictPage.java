package com.llj.web.entity.system.dict;

import java.util.Date;

import com.llj.framework.page.Page;

/**
 * 
 * @author lu
 *
 */
public class MyDictPage extends Page<DictValue> {

	private String name;// 值名称
	private Integer categoryId;// 所属分类ID
	private String categoryName;// 分类名称
	private String categoryCode;// 分类编码 [SystemConstants常量]
	private Integer parentId;// 父项ID
	private String parentName;// 父项名称
	private String mappingId;// mapping_id
	private Integer status;// 状态值 1：启动 2 停用 [SystemConstants常量]
	private Date createTime;// 创建时间
	private Date updateTime;// 修改时间

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public String getMappingId() {
		return mappingId;
	}

	public void setMappingId(String mappingId) {
		this.mappingId = mappingId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}
}
