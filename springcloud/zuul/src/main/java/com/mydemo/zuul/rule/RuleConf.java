package com.mydemo.zuul.rule;

import org.springframework.cloud.netflix.zuul.filters.discovery.PatternServiceRouteMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 自定义路由规则：配置访问"module/**"的项目，都转发到"module/**"进行处理
 */
@Configuration
public class RuleConf {

    @Bean
    public PatternServiceRouteMapper patternServiceRouteMapper(){
        return new PatternServiceRouteMapper(
                "(?<module>.+)", "${module}/**");
    }

}
