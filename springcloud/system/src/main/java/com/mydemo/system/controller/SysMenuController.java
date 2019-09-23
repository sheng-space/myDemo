package com.mydemo.system.controller;

import com.mydemo.base.service.RedisService;
import com.mydemo.base.util.BaseTool;
import com.mydemo.base.util.Tool;
import com.mydemo.system.entity.SysMenu;
import com.mydemo.system.service.SysMenuService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping("/menu")
public class SysMenuController extends BaseTool {

    @Resource
    private SysMenuService sysMenuService;
    @Resource
    private RedisService redisService;

    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam int currentPage,@RequestParam int pageSize,@RequestParam(required=false) String parentId) {
        return this.outSuccess(sysMenuService.listPage(currentPage,pageSize,parentId));
    }

    @RequestMapping("/getAll")
    @ResponseBody
    public Object getAll(@RequestParam(required=false) String parentId) {
        List<SysMenu> list=sysMenuService.getAll(parentId);
        return this.outSuccess(list);
    }

    @RequestMapping("/get")
    @ResponseBody
    public String get(String id) {
        SysMenu menu=sysMenuService.getOne(id);
        return this.outSuccess(menu);
    }

    @RequestMapping("/save")
    @ResponseBody
    public String save(SysMenu menu) {
        menu.setId(Tool.getUUID());
        int r = sysMenuService.insert(menu);
        return this.outSuccess();
    }

    @RequestMapping(value="/update")
    @ResponseBody
    public String update(SysMenu menu) {
        sysMenuService.update(menu);
        return this.outSuccess();
    }

    @RequestMapping(value="/delete")
    @ResponseBody
    public String delete(String id) {
        sysMenuService.delete(id);
        return this.outSuccess();
    }

    @RequestMapping("/getTree")
    @ResponseBody
    public String getTree(@RequestParam(required=false) String parentId) {
        List<SysMenu> list=sysMenuService.getAll(parentId);
        JSONArray tree = getTreeData("0",list);
        JSONObject jt = new JSONObject();
        jt.put("key","menuTree");
        jt.put("expire","1800");
        jt.put("value",tree.toString());
        redisService.add(jt.toString());
        return this.outSuccess(tree);
    }

    private JSONArray getTreeData(String parent_id,List<SysMenu> list){
        JSONArray tree = new JSONArray();
        for(SysMenu sysMenu:list){
            if(parent_id.equals(sysMenu.getParentId())){
                JSONObject menu = new JSONObject();
                menu.put("id",sysMenu.getId());
                menu.put("name",sysMenu.getName());
                menu.put("icon",sysMenu.getIcon());
                menu.put("path",sysMenu.getPath());
                JSONArray child = this.getTreeData(sysMenu.getId(),list);
                if(!child.isEmpty()){
                    menu.put("children",child);
                }
                tree.add(menu);
            }
        }
        return tree;
    }
}
