package com.mydemo.system.service.impl;

import com.github.pagehelper.PageHelper;
import com.mydemo.base.util.PageBean;
import com.mydemo.system.dao.SysUserMapper;
import com.mydemo.system.entity.SysUser;
import com.mydemo.system.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SysUserServiceImpl implements SysUserService {

   @Autowired
   private SysUserMapper sysUserMapper;

    @Override
    public List<SysUser> listPage(int currentPage, int pageSize) {
        //设置分页信息，分别是当前页数和每页显示的总记录数【记住：必须在mapper接口中的方法执行之前设置该分页信息】
        PageHelper.startPage(currentPage, pageSize);
        List<SysUser> list = sysUserMapper.getAll();//全部数据
        PageBean<SysUser> pageData = new PageBean<>(currentPage, pageSize, list.size());
        pageData.setItems(list);
        return pageData.getItems();
    }

    @Override
    public List<SysUser> getAll() {
        return sysUserMapper.getAll();
    }

    @Override
    public SysUser getOne(String id) {
        return sysUserMapper.selectByPrimaryKey(id);
    }

    @Override
    public int insert(SysUser user) {
        return sysUserMapper.insert(user);
    }

    @Override
    public int update(SysUser user) {
        return sysUserMapper.updateByPrimaryKey(user);
    }

    @Override
    public int delete(String id) {return sysUserMapper.deleteByPrimaryKey(id);}

    @Override
    public SysUser login(String account,String password) {return sysUserMapper.login(account,password);}
}
