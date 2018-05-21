package com.llj.web.controller.system.dict;

import com.alibaba.fastjson.JSONObject;
import com.llj.framework.page.JsonResult;
import com.llj.web.constants.SystemConstants;
import com.llj.web.entity.system.dict.DictCategory;
import com.llj.web.entity.system.dict.DictValue;
import com.llj.web.entity.system.dict.MyCategoryQuery;
import com.llj.web.entity.system.dict.MyDictPage;
import com.llj.web.service.system.dict.DictService;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Li Lei
 * @desc 字典 @version2.0.0 , 2016/8/15 17:02
 * @tag
 */
@RestController
@RequestMapping("/dict")
public class DictController {

    private static Logger logger = LogManager.getLogger(DictController.class);

    @Autowired
    private DictService dictService;

    /**
     * @param request
     * @param model
     * @param myDictQuery
     * @return
     * @desc 分页查询字典
     */
    @RequestMapping(value = "/queryDict")
    public ModelAndView queryDictValue(HttpServletRequest request, Model model, MyDictPage myDictQuery) {
        try {
            List<DictValue> list = dictService.queryDictValue(myDictQuery);
            myDictQuery.setQueryList(list);
            List<String> orderList = new ArrayList<String>();
            orderList.add("ydv.ID");
            if (myDictQuery.getOrderFields() == null) {
                myDictQuery.setOrderFields(orderList);
            }
            model.addAttribute("page", myDictQuery);
            List<DictCategory> categoryList = dictService.queryListCategory(null);
            if (categoryList != null && categoryList.size() > 0) {
                model.addAttribute("categoryList", categoryList);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("分页查询出现异常，异常信息 ", ex);
        }
        return new ModelAndView("system/dict/dictList");
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc to add dict
     */
    @RequestMapping(value = "/toAddDict")
    public ModelAndView toAddDict(HttpServletRequest request, Model model) {
        try {
            List<DictCategory> categoryList = dictService.queryListCategory(null);
            if (categoryList != null && categoryList.size() > 0) {
                model.addAttribute("categoryList", categoryList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return new ModelAndView("system/dict/dictAdd");
        }
        return new ModelAndView("system/dict/dictAdd");
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 获取字典层级数据
     */
    @RequestMapping(value = "/getDictVals")
    public JsonResult getDictVals(HttpServletRequest request, DictValue dictValue, Model model) {
        try {
            List<DictValue> valueList = dictService.getDictValue(dictValue);
            if (valueList != null && valueList.size() > 0) {
                JsonResult result = JsonResult.success();
                result.setResult(JSONObject.toJSON(valueList));
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
        return JsonResult.failure();
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 保存字典数据
     */
    @RequestMapping(value = "/saveDict")
    public JsonResult saveDict(HttpServletRequest request, DictValue dictValue, Model model) {
        try {
            dictService.saveDictVal(dictValue);
            JsonResult result = JsonResult.success();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 保存字典数据
     */
    @RequestMapping(value = "/toDetail")
    public ModelAndView toDetail(HttpServletRequest request, DictValue dictValue, Model model) {
        try {
            // 通过ID查询，只能查询出一条记录
            List<DictValue> dictValues = dictService.getDictValue(dictValue);
            if (dictValues != null && dictValues.size() > 0) {
                model.addAttribute("dictValue", dictValues.get(0));
            }
            List<DictCategory> categoryList = dictService.queryListCategory(null);
            if (categoryList != null && categoryList.size() > 0) {
                model.addAttribute("categoryList", categoryList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return new ModelAndView("system/dict/dictDetail");
        }
        return new ModelAndView("system/dict/dictDetail");
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 保存字典数据
     */
    @RequestMapping(value = "/editDictValue")
    public JsonResult editDictValue(HttpServletRequest request, DictValue dictValue, Model model) {
        try {
            dictService.updateDictVal(dictValue);
            JsonResult result = JsonResult.success();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 保存字典数据
     */
    @RequestMapping(value = "/removeDict")
    public JsonResult removeDict(HttpServletRequest request, String id, Model model) {
        try {
            if (StringUtils.isNotBlank(id)) {
                Integer dictId = Integer.parseInt(id.trim());
                dictService.removeDict(dictId);
            }
            JsonResult result = JsonResult.success();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param model
     * @param myCategoryQuery
     * @return
     * @desc 分页查询分类信息
     */
    @RequestMapping(value = "/queryCategory")
    public ModelAndView queryDictCategory(HttpServletRequest request, Model model, MyCategoryQuery myCategoryQuery) {
        try {
            List<DictCategory> list = dictService.queryCategoryPage(myCategoryQuery);
            myCategoryQuery.setQueryList(list);
            List<String> orderList = new ArrayList<String>();
            orderList.add("ydv.ID");
            if (myCategoryQuery.getOrderFields() == null) {
                myCategoryQuery.setOrderFields(orderList);
            }
            model.addAttribute("page", myCategoryQuery);
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("程序出现异常，异常信息 ", ex);
        }
        return new ModelAndView("system/dict/categoryList");
    }

    /**
     * @param request
     * @param model
     * @param dictCategory
     * @return
     * @desc 查询字典分类名称
     */
    @RequestMapping(value = "/findCategory")
    public JsonResult findCategory(HttpServletRequest request, Model model, DictCategory dictCategory) {
        try {
            List<DictCategory> list = dictService.queryListCategory(dictCategory);
            if (null != list && list.size() > 0) {
                JsonResult result = JsonResult.success();
                result.setResult(list.get(0));
                return result;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("程序出现异常，异常信息 ", ex);
            return JsonResult.failure();
        }
        return JsonResult.failure();
    }

    /**
     * @param request
     * @param model
     * @param dictCategory
     * @return
     * @desc 保存编辑字典分类
     */
    @RequestMapping(value = "/editCategory")
    public JsonResult editCategory(HttpServletRequest request, Model model, DictCategory dictCategory) {
        try {
            dictService.updateCategory(dictCategory);
            return JsonResult.success();
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("程序出现异常，异常信息 ", ex);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param id
     * @param model
     * @return
     * @desc 删除分类
     */
    @RequestMapping(value = "/removeCategory")
    public JsonResult removeCategory(HttpServletRequest request, String id, Model model) {
        try {
            if (StringUtils.isNotBlank(id)) {
                Integer cateId = Integer.parseInt(id.trim());
                dictService.deleteCategory(cateId);
            }
            JsonResult result = JsonResult.success();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param model
     * @return
     * @desc 跳转到新增页面
     */
    @RequestMapping(value = "/toAddCategory")
    public ModelAndView toAddCategory(HttpServletRequest request, Model model) {

        return new ModelAndView("system/dict/addCategory");
    }

    /**
     * @param request
     * @param dictCategory
     * @param model
     * @return
     * @desc 保存分类
     */
    @RequestMapping(value = "/saveCategory")
    public JsonResult saveCategory(HttpServletRequest request, DictCategory dictCategory, Model model) {
        try {
            dictService.saveCategory(dictCategory);
            JsonResult result = JsonResult.success();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @param request
     * @param dictCategory
     * @param model
     * @return
     * @desc 校验参数，新增或者编辑时，分类名称不能重复
     */
    @RequestMapping(value = "/checkCategory")
    public JsonResult checkCategory(HttpServletRequest request, DictCategory dictCategory, Model model) {
        try {
            boolean flag = dictService.checkCategory(dictCategory);
            if (flag) {
                return JsonResult.success();
            }
            return JsonResult.failure();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("程序出现异常，异常信息 ", e);
            return JsonResult.failure();
        }
    }

    /**
     * @return
     * @desc 查询省
     */
    @ResponseBody
    @RequestMapping("/getProvince")
    public JsonResult getProvince() {
        try {
            DictValue dictValue = new DictValue();
            /** 查询省地区 ,可用 */
            dictValue.setCategoryCode(SystemConstants.DICT_REGION);
            dictValue.setCategoryId(SystemConstants.DICT_CATEGORY_AREA);
            dictValue.setStatus(SystemConstants.DICT_VALUE_ENABLE);
            dictValue.setParentId(0); // 父项ID为0，省
            List<DictValue> dictValues = dictService.getDictValue(dictValue);
            if (null != dictValues && dictValues.size() > 0) {
                JsonResult result = JsonResult.success();
                result.setResult(dictValues);
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("查询字典省出现异常，异常信息： ", e);
            return JsonResult.failure();
        }
        return JsonResult.failure();
    }

    /**
     * @param parentId
     * @return
     * @desc 查询市或者县
     */
    @ResponseBody
    @RequestMapping("/getCity")
    public JsonResult getCity(Integer parentId) {
        try {
            DictValue dictValue = new DictValue();
            /** 查询省地区 ,可用 */
            dictValue.setCategoryCode(SystemConstants.DICT_REGION);
            dictValue.setCategoryId(SystemConstants.DICT_CATEGORY_AREA);
            dictValue.setStatus(SystemConstants.DICT_VALUE_ENABLE);
            dictValue.setParentId(parentId);
            List<DictValue> dictValues = dictService.getDictValue(dictValue);
            if (null != dictValues && dictValues.size() > 0) {
                JsonResult result = JsonResult.success();
                result.setResult(dictValues);
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("查询字典市，区出现异常，异常信息： ", e);
            return JsonResult.failure();
        }
        return JsonResult.failure();
    }

}
