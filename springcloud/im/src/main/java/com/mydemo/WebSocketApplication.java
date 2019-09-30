package com.mydemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class WebSocketApplication {

    public static void main(String[] args){
        SpringApplication.run(WebSocketApplication.class,args);
    }
}
