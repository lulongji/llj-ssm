package com.llj.web.entity.system.dict;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author Li Lei
 * @desc 字典值表 @version2.0.0 , 2016/8/15 16:10
 * @tag
 */
@SuppressWarnings("serial")
public class DictValue implements Serializable {

	private Integer id;// ID
	private String name;// 值名称
	private Integer categoryId;// 所属分类 1.性别 2.地区 3.科室 4.课程 5.职称
								// 6.证件类型[SystemConstants常量]
	private String categoryName;// 分类名称
	private String categoryCode;// 分类编码 [SystemConstants常量]
	private Integer parentId;// 父项ID
	private String parentName;// 父项名称
	private String mappingId;// mapping_id sip_id
	private Integer status;// 状态值 1：启动 2 停用 [SystemConstants常量]
	private Integer mappingParentId; // sip parent_id
	private Date createTime;// 创建时间
	private Date updateTime;// 修改时间
	private Integer dictLevel; // 层级

	/**
	 * 新增的
	 */
	private String dictCode;// 字典编码
	/**
	 * 新增的字段
	 */
	private String dictContent;// 字典内容

	public String getDictCode() {
		return dictCode;
	}

	public void setDictCode(String dictCode) {
		this.dictCode = dictCode;
	}

	public String getDictContent() {
		return dictContent;
	}

	public void setDictContent(String dictContent) {
		this.dictContent = dictContent;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	private List<DictValue> dictValueList;// 子集

	public List<DictValue> getDictValueList() {
		return dictValueList;
	}

	public void setDictValueList(List<DictValue> dictValueList) {
		this.dictValueList = dictValueList;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
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

	public Integer getMappingParentId() {
		return mappingParentId;
	}

	public void setMappingParentId(Integer mappingParentId) {
		this.mappingParentId = mappingParentId;
	}

	public Integer getDictLevel() {
		return dictLevel;
	}

	public void setDictLevel(Integer dictLevel) {
		this.dictLevel = dictLevel;
	}

	@Override
	public String toString() {
		return "DictValue{" + "id=" + id + ", name='" + name + '\'' + ", categoryId=" + categoryId + ", categoryName='"
				+ categoryName + '\'' + ", categoryCode='" + categoryCode + '\'' + ", parentId=" + parentId
				+ ", parentName='" + parentName + '\'' + ", mappingId='" + mappingId + '\'' + ", status=" + status
				+ ", mappingParentId=" + mappingParentId + ", createTime=" + createTime + ", updateTime=" + updateTime
				+ ", dictLevel=" + dictLevel + ", dictCode='" + dictCode + '\'' + ", dictContent='" + dictContent + '\''
				+ ", dictValueList=" + dictValueList + '}';
	}
}
