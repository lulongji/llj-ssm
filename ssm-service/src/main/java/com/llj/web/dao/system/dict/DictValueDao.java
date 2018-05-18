package com.llj.web.dao.system.dict;

import java.util.List;

import com.llj.web.entity.system.dict.DictValue;
import com.llj.web.entity.system.dict.MyDictPage;

/**
 * @author Li Lei
 * @desc @version2.0.0 , 2016/8/15 16:32
 * @tag
 */
public interface DictValueDao {

	/**
	 * @param myDictQuery
	 * @return
	 * @desc 查询
	 */
	List<DictValue> queryBycondtion(MyDictPage myDictQuery);

	/**
	 * @param dictValue
	 * @return
	 * @desc 查询字典值
	 */
	List<DictValue> findListBy(DictValue dictValue);

	/**
	 * @param dictValue
	 * @return
	 * @desc 新增
	 */
	int save(DictValue dictValue);

	/**
	 * @param dictValue
	 * @return
	 * @desc 动态update
	 */
	int updateDynamic(DictValue dictValue);

	/**
	 * @param ids
	 * @return
	 * @desc 通过ID，删除字典信息
	 */
	int removeDictByIds(List<Integer> ids);

	/**
	 * @param id
	 * @return
	 * @desc 通过节点ID，查询所有子级节点
	 */
	List<Integer> getDictLevNext(Integer id);

}
