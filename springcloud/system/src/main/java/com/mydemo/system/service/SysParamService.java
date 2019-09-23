package com.mydemo.system.service;

import com.mydemo.system.entity.SysParam;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SysParamService {

    List<SysParam> listPage(int currentPage, int pageSize);

    List<SysParam> getAll();

    SysParam getOne(String id);

    int insert(SysParam param);

    int update(SysParam param);

    int delete(String id);
}
