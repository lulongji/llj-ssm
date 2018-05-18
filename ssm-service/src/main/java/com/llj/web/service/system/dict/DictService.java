package com.llj.web.service.system.dict;

import java.util.List;

import com.llj.web.entity.system.dict.DictCategory;
import com.llj.web.entity.system.dict.DictValue;
import com.llj.web.entity.system.dict.MyCategoryQuery;
import com.llj.web.entity.system.dict.MyDictPage;

public interface DictService {

	/**
	 * @param myDictQuery
	 * @return
	 * @desc 分页查询字典值表
	 */
	List<DictValue> queryDictValue(MyDictPage myDictQuery);

	/**
	 * @param dictCategory
	 * @return
	 * @desc find dictCategory for List
	 */
	List<DictCategory> queryListCategory(DictCategory dictCategory);

	/**
	 * @param dictValue
	 * @return
	 * @desc find dictValue for List
	 */
	List<DictValue> getDictValue(DictValue dictValue);

	/**
	 * @param dictValue
	 * @throws RuntimeException
	 * @desc save new DictValue data
	 */
	void saveDictVal(DictValue dictValue) throws RuntimeException;

	/**
	 * Update DictValue data
	 *
	 * @param dictValue
	 * @throws RuntimeException
	 */
	void updateDictVal(DictValue dictValue) throws RuntimeException;

	/**
	 * remove DictValue data from db
	 *
	 * @param dictId
	 * @throws RuntimeException
	 */
	void removeDict(Integer dictId) throws RuntimeException;

	/**
	 * @param myCategoryQuery
	 * @return
	 * @desc query dictCategroy data for page
	 */
	List<DictCategory> queryCategoryPage(MyCategoryQuery myCategoryQuery);

	/**
	 * @param dictCategory
	 * @throws RuntimeException
	 * @desc update dictCategroy data
	 */
	void updateCategory(DictCategory dictCategory) throws RuntimeException;

	/**
	 * @param id
	 * @throws RuntimeException
	 * @desc remove categroy data from db
	 */
	void deleteCategory(Integer id) throws RuntimeException;

	/**
	 * @param dictCategory
	 * @throws RuntimeException
	 * @desc save new categroy data
	 */
	void saveCategory(DictCategory dictCategory) throws RuntimeException;

	/**
	 * desc 判断是否可以进行操作
	 *
	 * @param dictCategory
	 * @return
	 */
	boolean checkCategory(DictCategory dictCategory);

}
