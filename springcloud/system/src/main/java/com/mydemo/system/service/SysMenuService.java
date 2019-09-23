package com.mydemo.system.service;


import com.mydemo.system.entity.SysMenu;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SysMenuService {

    List<SysMenu> listPage(int currentPage, int pageSize,String parentId);

    List<SysMenu> getAll(String parentId);

    SysMenu getOne(String id);

    int insert(SysMenu user);

    int update(SysMenu user);

    int delete(String id);
}
