package com.llj.web.dao.system.dict;

import java.util.List;

import com.llj.web.entity.system.dict.DictCategory;
import com.llj.web.entity.system.dict.MyCategoryQuery;

/**
 * @author Li Lei
 * @desc
 * @version2.0.0 , 2016/8/15 15:52
 * @tag
 */
public interface DictCategoryDao {

    void insertDict();

    /**
     * @desc 查询字典分类
     * @param myCategoryQuery
     * @return
     */
    List<DictCategory> queryBycondtion(MyCategoryQuery myCategoryQuery);

    /**
     * @desc 查询字典分类结果集
     * @param dictCategory
     * @return
     */
    List<DictCategory> findListBy(DictCategory dictCategory);

    /**
     * @desc 校验
     * @param dictCategory
     * @return
     */
    List<DictCategory> checkCategory(DictCategory dictCategory);

    /**
     * @desc 新增
     * @param dictCategory
     * @return
     */
    int save(DictCategory dictCategory);

    /**
     * @desc 动态修改
     * @param dictCategory
     * @return
     */
    int updateDynamic(DictCategory dictCategory);

    int deleteCategory(Integer id);


}
