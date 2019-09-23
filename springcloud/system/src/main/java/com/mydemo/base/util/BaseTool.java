package com.mydemo.base.util;
import com.mydemo.base.result.ResultDTO;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseTool {

    public static String outSuccess(Object result,String resultMsg) {
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setCode("0");
        resultDTO.setMsg(resultMsg);
        resultDTO.setData(result);
        return JSONObject.fromObject(resultDTO).toString();
    }
    public static String outSuccess(Object result) {
        return outSuccess(result,"");
    }
    public static String outSuccess() {
        return outSuccess("{}");
    }
    public static String outError(String resultMsg, Object result) {
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setCode("1");
        resultDTO.setMsg(resultMsg);
        resultDTO.setData(result);
        return JSONObject.fromObject(resultDTO).toString();
    }

    public static String outError(String resultMsg) {
        return outError(resultMsg,"{}");
    }
    public static String outError() {
        return outError("","{}");
    }

}
