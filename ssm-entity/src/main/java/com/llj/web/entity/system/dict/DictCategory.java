package com.llj.web.entity.system.dict;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author Li Lei
 * @desc 字典分类 @version2.0.0 , 2016/8/15 16:06
 * @tag
 */
@SuppressWarnings("serial")
public class DictCategory implements Serializable {

	private Integer id;// ID
	private String categoryName;// 分类名称
	private String categoryCode;// 分类编码
	private Date createTime;// 创建时间
	private Date updateTime;// 修改时间

	private List<DictValue> dictValues;// 值

	public List<DictValue> getDictValues() {
		return dictValues;
	}

	public void setDictValues(List<DictValue> dictValues) {
		this.dictValues = dictValues;
	}

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
