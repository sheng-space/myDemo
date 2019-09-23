package com.mydemo.base.service;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(value = "redis")
public interface RedisService {
    @RequestMapping(value="/add")
    String add(@RequestParam("json") String json);

    @RequestMapping({"/get"})
    String get(@RequestParam("key") String value);

    @RequestMapping({"/delete"})
    String delete(@RequestParam("key") String value);
}