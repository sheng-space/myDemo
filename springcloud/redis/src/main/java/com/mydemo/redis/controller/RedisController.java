package com.mydemo.redis.controller;
import com.mydemo.base.util.BaseTool;
import com.mydemo.redis.config.RedisStringUtils;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class RedisController extends BaseTool {

    @Autowired
    private RedisStringUtils redisString;

    @RequestMapping(value = "/add")
    @ResponseBody
    public String add(@RequestParam String json) {
        try{
            JSONObject jt = JSONObject.fromObject(json);
            redisString.setKey(jt.getString("key").toString(), jt.getString("value").toString(),jt.getLong("expire"));
        }catch (NumberFormatException e){
            e.printStackTrace();
            return this.outError("参数异常");
        }
        return this.outSuccess();
    }
    @RequestMapping(value = "/get")
    public String get(@RequestParam("key")String key){
        String user = redisString.getValue(key);
        if(user != null){
            return this.outSuccess(user);
        }else{
            return this.outError("key:"+key+"不存在value");
        }
    }
}
