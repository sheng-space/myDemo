package com.mydemo.zuul.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 对异常响应内如处理
 */
@RestController
public class ExceptionHandler implements ErrorController {

    @Override
    public String getErrorPath() {
        return "/error";
    }
    @RequestMapping(value="/error")
    public String error(){
        return "{\"result\":\"500 error!!!!\"}";
    }
}