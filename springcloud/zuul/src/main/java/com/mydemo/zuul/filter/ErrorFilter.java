package com.mydemo.zuul.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletResponse;

@Component
public class ErrorFilter extends ZuulFilter {

    /**
     * 过滤方法
     */
    @Override
    public Object run() {
        RequestContext context = RequestContext.getCurrentContext();
        Throwable throwable = context.getThrowable();
        context.set("error.status_code", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        context.set("error.message",throwable.getCause().getMessage());
        return null;
    }

    /**
     * 是否开启过滤:默认false
     */
    @Override
    public boolean shouldFilter() {
        return true;
    }

    /**
     * 多个过滤器中的执行顺序，数值越小，优先级越高
     */
    @Override
    public int filterOrder() {
        return 10;
    }

    /**
     * 过滤器的类型
     */
    @Override
    public String filterType() {
        return FilterConstants.ERROR_TYPE;
    }
}