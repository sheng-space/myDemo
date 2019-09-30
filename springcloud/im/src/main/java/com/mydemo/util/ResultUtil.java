package com.mydemo.util;

import com.alibaba.fastjson.JSONObject;
import com.mydemo.domain.ResultDTO;
import com.mydemo.enums.ResultEnum;


public class ResultUtil {
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static String success(Object result) {
        if("".equals(result)){
            result = "{}";
        }
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setCode(ResultEnum.CODE_0.getResultCode());
        resultDTO.setMsg(ResultEnum.CODE_0.getResultMsg());
        resultDTO.setData(result);
        return JSONObject.toJSONString(resultDTO);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static String error(String resultCode, String resultMsg, Object result) {
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setCode(resultCode);
        resultDTO.setMsg(resultMsg);
        resultDTO.setData(result);
        return JSONObject.toJSONString(resultDTO);
    }
}
