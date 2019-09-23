package com.mydemo.system.service.impl;

import com.github.pagehelper.PageHelper;
import com.mydemo.base.util.PageBean;
import com.mydemo.system.dao.SysMenuMapper;
import com.mydemo.system.entity.SysMenu;
import com.mydemo.system.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SysMenuServiceImpl implements SysMenuService {

   @Autowired
   private SysMenuMapper sysMenuMapper;

    @Override
    public List<SysMenu> listPage(int currentPage, int pageSize,String parentId) {
        //设置分页信息，分别是当前页数和每页显示的总记录数【记住：必须在mapper接口中的方法执行之前设置该分页信息】
        PageHelper.startPage(currentPage, pageSize);
        List<SysMenu> list = sysMenuMapper.getAll(parentId);//全部数据
        PageBean<SysMenu> pageData = new PageBean<>(currentPage, pageSize, list.size());
        pageData.setItems(list);
        return pageData.getItems();
    }

    @Override
    public List<SysMenu> getAll(String parentId) {
        return sysMenuMapper.getAll(parentId);
    }

    @Override
    public SysMenu getOne(String id) {
        return sysMenuMapper.selectByPrimaryKey(id);
    }

    @Override
    public int insert(SysMenu user) {
        return sysMenuMapper.insert(user);
    }

    @Override
    public int update(SysMenu user) {
        return sysMenuMapper.updateByPrimaryKey(user);
    }

    @Override
    public int delete(String id) {return sysMenuMapper.deleteByPrimaryKey(id);}

}
