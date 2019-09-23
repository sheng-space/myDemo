package com.mydemo.system.service;


import com.mydemo.system.entity.SysUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SysUserService {

    List<SysUser> listPage(int currentPage, int pageSize);

    List<SysUser> getAll();

    SysUser getOne(String id);

    int insert(SysUser user);

    int update(SysUser user);

    int delete(String id);

    SysUser login(String account, String password);
}
