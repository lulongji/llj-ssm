/**
 * 
 */
package com.llj.web.entity.system;

/**
 * 
 * 树结构节点
 * 
 * @author lu
 *
 */
public class ZtreeNodes {
	private int id;
	private Integer pId;// 父id
	private String name;// 名称
	private boolean checked;// 选中状态
	private boolean open;// 展开
	
	private String categoryCode;
	private String isParent = "true";
	private Integer dictLevel;
	
	

	public Integer getDictLevel() {
		return dictLevel;
	}

	public void setDictLevel(Integer dictLevel) {
		this.dictLevel = dictLevel;
	}


	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final int getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public final boolean isChecked() {
		return checked;
	}

	public final void setChecked(boolean checked) {
		this.checked = checked;
	}

	public final boolean isOpen() {
		return open;
	}

	public final void setOpen(boolean open) {
		this.open = open;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getIsParent() {
		return isParent;
	}

	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}

}
