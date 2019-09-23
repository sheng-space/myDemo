package com.mydemo;
import com.netflix.zuul.FilterFileManager;
import com.netflix.zuul.FilterLoader;
import com.netflix.zuul.groovy.GroovyCompiler;
import com.netflix.zuul.groovy.GroovyFileFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;

import javax.annotation.PostConstruct;
import java.io.File;


@SpringBootApplication(scanBasePackages = "com.mydemo")
@EnableFeignClients(basePackages="com.mydemo")
@EnableZuulProxy
public class ZuulApplication {

	@PostConstruct
	public void zuulInit() {
		FilterLoader.getInstance().setCompiler(new GroovyCompiler());
		// 读取配置，获取脚本根目录
		String scriptRoot = System.getProperty("zuul.filter.root", "zuul/src/main/java/groovy/filters");
		// 获取刷新间隔
		String refreshInterval = System.getProperty("zuul.filter.refreshInterval", "30");
		if (scriptRoot.length() > 0) scriptRoot = scriptRoot + File.separator;
		try {
			FilterFileManager.setFilenameFilter(new GroovyFileFilter());
			FilterFileManager.init(Integer.parseInt(refreshInterval), scriptRoot + "pre",
					scriptRoot + "route", scriptRoot + "post");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static void main(String[] args) {SpringApplication.run( ZuulApplication.class, args);}
}
