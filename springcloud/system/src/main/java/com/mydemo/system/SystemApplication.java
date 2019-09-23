package com.mydemo.system;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication(scanBasePackages="com.mydemo")
@MapperScan("com.mydemo.system.dao")
@EnableEurekaClient
@EnableFeignClients(basePackages="com.mydemo")
@ImportResource("classpath:ApplicationContext.xml")
public class SystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemApplication.class, args);
	}

}
