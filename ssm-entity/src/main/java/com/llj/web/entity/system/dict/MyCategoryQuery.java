package com.llj.web.entity.system.dict;

import java.util.Date;

import com.llj.framework.page.Page;

/**
 * 
 * @author lu
 *
 */
public class MyCategoryQuery extends Page<DictCategory> {

	private Integer id;// ID
	private String categoryName;// 分类名称
	private String categoryCode;// 分类编码
	private Date createTime;// 创建时间
	private Date updateTime;// 修改时间

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}
}
