package com.mydemo.system.controller;

import com.mydemo.base.service.RedisService;
import com.mydemo.base.util.BaseTool;
import com.mydemo.base.util.Log;
import com.mydemo.base.util.TokenUtil;
import com.mydemo.base.util.Tool;
import com.mydemo.system.entity.SysUser;
import com.mydemo.system.service.SysUserService;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping("/user")
public class SysUserController extends BaseTool {

    @Resource
    private SysUserService sysUserService;
    @Resource
    private RedisService redisService;

    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam int currentPage,@RequestParam int pageSize) {
        return this.outSuccess(sysUserService.listPage(currentPage,pageSize));
    }

    @RequestMapping("/getAll")
    @ResponseBody
    public Object getAll() {
        List<SysUser> users=sysUserService.getAll();
        Log.info(this.outSuccess(users));
        return this.outSuccess(users);
    }

    @RequestMapping("/get")
    @ResponseBody
    public String get(String id) {
        SysUser user=sysUserService.getOne(id);
        JSONObject jt = new JSONObject();
        jt.put("key","user");
        jt.put("expire","1800");
        jt.put("value",JSONObject.fromObject(user).toString());
        redisService.add(jt.toString());
        return this.outSuccess(user);
    }

    @RequestMapping("/save")
    @ResponseBody
    public String save(SysUser user) {
        user.setId(Tool.getUUID());
        int r = sysUserService.insert(user);
        return this.outSuccess();
    }

    @RequestMapping(value="/update")
    @ResponseBody
    public String update(SysUser user) {
        sysUserService.update(user);
        return this.outSuccess();
    }

    @RequestMapping(value="/delete")
    @ResponseBody
    public String delete(String id) {
        sysUserService.delete(id);
        return this.outSuccess();
    }


    @RequestMapping("/login")
    @ResponseBody
    public String login(@RequestParam String account,@RequestParam String password) {
        SysUser users=sysUserService.login(account,password);
        if(users==null){
            return this.outError("账号或者密码错误");
        }
        //存在此用户,生成token
        String token = TokenUtil.getToken();
        try{
            //把token缓存到redis
            JSONObject jt = new JSONObject();
            jt.put("key",token);
            jt.put("value",users);
            jt.put("expire","7200");//有效期7200秒
            redisService.add(jt.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.outSuccess(users,token);
    }
}
