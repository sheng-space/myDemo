package com.mydemo.system.service.impl;

import com.github.pagehelper.PageHelper;
import com.mydemo.base.util.PageBean;
import com.mydemo.system.entity.SysParam;
import com.mydemo.system.service.SysParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SysParamServiceImpl implements SysParamService{

    @Autowired
    private SysParamServiceImpl sysParamMapper;

    @Override
    public List<SysParam> listPage(int currentPage, int pageSize) {
        //设置分页信息，分别是当前页数和每页显示的总记录数【记住：必须在mapper接口中的方法执行之前设置该分页信息】
        PageHelper.startPage(currentPage, pageSize);
        List<SysParam> list = sysParamMapper.getAll();//全部数据
        PageBean<SysParam> pageData = new PageBean<>(currentPage, pageSize, list.size());
        pageData.setItems(list);
        return pageData.getItems();
    }

    @Override
    public List<SysParam> getAll() {
        return sysParamMapper.getAll();
    }

    @Override
    public int insert(SysParam param) {
        return sysParamMapper.insert(param);
    }

    @Override
    public SysParam getOne(String id) {
        return sysParamMapper.getOne(id);
    }

    @Override
    public int update(SysParam param) {
        return sysParamMapper.update(param);
    }

    @Override
    public int delete(String id) {
        return sysParamMapper.delete(id);
    }
}
