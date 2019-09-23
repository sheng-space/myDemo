package com.mydemo.system.dao;


import com.mydemo.system.entity.SysParam;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysParamMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysParam record);

    int insertSelective(SysParam record);

    SysParam selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysParam record);

    int updateByPrimaryKey(SysParam record);
}