package com.llj.web.service.system.dict.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.llj.web.dao.system.dict.DictCategoryDao;
import com.llj.web.dao.system.dict.DictValueDao;
import com.llj.web.entity.system.dict.DictCategory;
import com.llj.web.entity.system.dict.DictValue;
import com.llj.web.entity.system.dict.MyCategoryQuery;
import com.llj.web.entity.system.dict.MyDictPage;
import com.llj.web.service.system.dict.DictService;

@Service
public class DictServiceImpl implements DictService {

	private static Logger logger = LogManager.getLogger(DictServiceImpl.class);

	@Autowired
	private DictValueDao dictValueDao;

	@Autowired
	private DictCategoryDao dictCategoryDao;

	@Override
	public List<DictValue> queryDictValue(MyDictPage myDictQuery) {

		List<DictValue> dictValues = dictValueDao.queryBycondtion(myDictQuery);
		myDictQuery.setQueryList(dictValues);

		return dictValues;
	}

	/**
	 * @param dictCategory
	 * @return
	 * @desc 查询字典分类
	 */
	@Override
	public List<DictCategory> queryListCategory(DictCategory dictCategory) {
		List<DictCategory> categoryList = dictCategoryDao.findListBy(dictCategory);
		return categoryList;
	}

	/**
	 * @param dictValue
	 * @return
	 * @desc 查询字典，返回List
	 */
	@Override
	public List<DictValue> getDictValue(DictValue dictValue) {

		List<DictValue> dictValues = dictValueDao.findListBy(dictValue);
		return dictValues;
	}

	/**
	 * @param parentId
	 *            父项ID
	 * @param dictValues
	 *            数据字典集合
	 * @return
	 * @desc 格式化层级关系，数据字典
	 */
	@SuppressWarnings("unused")
	private List<DictValue> formatValList(int parentId, List<DictValue> dictValues) {
		List<DictValue> resList = new ArrayList<DictValue>();
		// List<DictValue> lastList = new ArrayList<DictValue>();
		/* 循环，进行格式化代码 */
		for (DictValue dictValue : dictValues) {
			if (dictValue.getParentId() == parentId) {
				// 判断是否为一级，一级直接放入
				List<DictValue> tmpList = formatValList(dictValue.getId(), dictValues);
				dictValue.setDictValueList(tmpList);
				resList.add(dictValue);
			}
		}

		return resList;
	}

	/**
	 * @param dictValue
	 * @desc 保存字典值数据
	 */
	public void saveDictVal(DictValue dictValue) throws RuntimeException {
		dictValue.setCreateTime(new Date());
		if (dictValue.getParentId() == null) {
			dictValue.setParentId(0);
			dictValue.setDictLevel(1);
		} else {
			dictValue.setDictLevel(dictValue.getDictLevel() + 1);
		}
		if (dictValue.getStatus() == null) {
			// 为设定，默认字典可用状态
			dictValue.setStatus(1);
		}
		int result = dictValueDao.save(dictValue);
		if (result < 1) {
			throw new RuntimeException("新增字典数据失败");
		}
	}

	/**
	 * @param dictValue
	 * @desc 更新字典值数据
	 */
	public void updateDictVal(DictValue dictValue) throws RuntimeException {
		dictValue.setUpdateTime(new Date());

		int result = dictValueDao.updateDynamic(dictValue);
		if (result < 1) {
			throw new RuntimeException("更新字典数据失败");
		}
	}

	/**
	 * @param dictId
	 * @throws RuntimeException
	 * @desc 删除字典数据。包含下属子节点
	 */
	public void removeDict(Integer dictId) throws RuntimeException {
		List<Integer> dictIds = dictValueDao.getDictLevNext(dictId);
		if (dictIds != null && dictIds.size() > 0) {
			int result = dictValueDao.removeDictByIds(dictIds);
			if (result < 1) {
				throw new RuntimeException("删除字典数据失败");
			}
		} else {
			throw new RuntimeException("传入参数错误，dictId = " + dictId);
		}
	}

	/**
	 * @param myCategoryQuery
	 * @return
	 * @desc 带分页信息查询分类列表
	 */
	@Override
	public List<DictCategory> queryCategoryPage(MyCategoryQuery myCategoryQuery) {

		List<DictCategory> categoryList = dictCategoryDao.queryBycondtion(myCategoryQuery);

		return categoryList;
	}

	/**
	 * @param dictCategory
	 * @throws RuntimeException
	 * @desc 动态更新字典分类列表
	 */
	@Override
	public void updateCategory(DictCategory dictCategory) throws RuntimeException {
		dictCategory.setUpdateTime(new Date());
		dictCategoryDao.updateDynamic(dictCategory);
	}

	/**
	 * @param id
	 * @throws RuntimeException
	 * @desc 删除字典分类数据
	 */
	@Override
	public void deleteCategory(Integer id) throws RuntimeException {
		if (id != null) {
			int result = dictCategoryDao.deleteCategory(id);
			if (result < 1) {
				throw new RuntimeException("删除字典数据失败");
			}
		} else {
			throw new RuntimeException("传入参数错误，id = " + id);
		}
	}

	/**
	 * @param dictCategory
	 * @throws RuntimeException
	 * @desc 保存
	 */
	@Override
	public void saveCategory(DictCategory dictCategory) throws RuntimeException {
		dictCategory.setCreateTime(new Date());
		int result = dictCategoryDao.save(dictCategory);
		if (result < 1) {
			throw new RuntimeException("删除字典数据失败");
		}
	}

	/**
	 * @param dictCategory
	 * @return
	 * @desc check the name can use
	 */
	@Override
	public boolean checkCategory(DictCategory dictCategory) {

		DictCategory param = new DictCategory();
		param.setCategoryName(dictCategory.getCategoryName());
		param.setCategoryCode(dictCategory.getCategoryCode());
		// 查看此名称是否可用
		List<DictCategory> dictCategories = dictCategoryDao.checkCategory(param);

		// 存在ID则为更新
		if (dictCategory.getId() != null) {
			if (StringUtils.isBlank(dictCategory.getCategoryCode())) {
				logger.debug("校验出现问题，校验参数  id = " + dictCategory.getId() + "  CategoryCode = "
						+ dictCategory.getCategoryCode());
				return false;
			}
			// 如果查询不到结果，证明可用，验证通过
			if (dictCategories == null || dictCategories.size() < 1) {
				return true;
			}
			// 如果查询到多个结果集，则循环，只要存在查询到ID与传入ID不同，则证明名称已经被占用，验证不通过
			boolean tempFlag = true;
			for (DictCategory category : dictCategories) {
				if (category.getId() != dictCategory.getId()) {
					tempFlag = false;
				}
			}
			return tempFlag;
		}
		// 不存在ID，查看是否存在名称
		if (StringUtils.isBlank(dictCategory.getCategoryCode())) {
			logger.debug(
					"校验出现问题，校验参数  id = " + dictCategory.getId() + "  CategoryCode = " + dictCategory.getCategoryCode());
			return false;
		}
		// 不存在ID，name存在，要进行新增操作，进行校验
		return !(null != dictCategories && dictCategories.size() > 0);
	}
}
