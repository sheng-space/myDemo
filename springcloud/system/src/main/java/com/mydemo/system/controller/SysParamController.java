package com.mydemo.system.controller;

import com.mydemo.base.service.RedisService;
import com.mydemo.base.util.BaseTool;
import com.mydemo.base.util.Tool;
import com.mydemo.system.entity.SysParam;
import com.mydemo.system.service.SysParamService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping("/param")
public class SysParamController extends BaseTool {

    @Resource
    private SysParamService sysParamService;
    @Resource
    private RedisService redisService;

    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam int currentPage,@RequestParam int pageSize) {
        return this.outSuccess(sysParamService.listPage(currentPage,pageSize));
    }

    @RequestMapping("/getAll")
    @ResponseBody
    public Object getAll() {
        List<SysParam> list=sysParamService.getAll();
        JSONObject jt = new JSONObject();
        jt.put("key","paramList");
        jt.put("expire","1800");
        jt.put("value",JSONObject.fromObject(list).toString());
        redisService.add(jt.toString());
        return this.outSuccess(list);
    }

    @RequestMapping("/get")
    @ResponseBody
    public String get(String id) {
        SysParam param=sysParamService.getOne(id);
        return this.outSuccess(param);
    }

    @RequestMapping("/save")
    @ResponseBody
    public String save(SysParam param) {
        param.setId(Tool.getUUID());
        int r = sysParamService.insert(param);
        return this.outSuccess();
    }

    @RequestMapping(value="/update")
    @ResponseBody
    public String update(SysParam param) {
        sysParamService.update(param);
        return this.outSuccess();
    }

    @RequestMapping(value="/delete")
    @ResponseBody
    public String delete(String id) {
        sysParamService.delete(id);
        return this.outSuccess();
    }
}
