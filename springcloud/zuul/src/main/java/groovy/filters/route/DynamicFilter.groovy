package groovy.filters.route

import com.mydemo.base.result.ResultDTO;
import com.mydemo.base.service.RedisService;
import net.sf.json.JSONObject;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import com.netflix.zuul.context.RequestContext
import org.springframework.http.HttpStatus;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import com.netflix.zuul.ZuulFilter;

/**
 * 动态的自定义过滤器
 */
class DynamicFilter extends ZuulFilter {

    @Resource
    private RedisService redisService1;

    //排除过滤的 uri 地址
    private static final String LOGIN_URI = "/user/login";


    @Override
    public Object run() {

        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        //当前请求的地址
        String url = request.getRequestURL().toString();

        System.out.println("动态过滤器拦截："+url);

        String token = request.getHeader("token");
        System.out.println("token："+token);
        if (token == null || token.isEmpty()) {
            setUnauthorizedResponse(ctx, "token is empty");
            return null;
        }
        try {
            Object user = redisService1.get(token);
        }catch (Exception e){
            e.printStackTrace()
        }

        System.out.println("user："+user);
        if(user==null){
            setUnauthorizedResponse(ctx, "user is lose efficacy");
            return null;
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
//        RequestContext requestContext = RequestContext.getCurrentContext();
//        HttpServletRequest request = requestContext.getRequest();
//
//        //当前请求的地址
//        String url = request.getRequestURL().toString();
//
//        //登录接口不拦截，其他接口都要拦截校验 token
//        if (url.indexOf(LOGIN_URI) > -1) {
//            return false;
//        }
        return false;
    }

    @Override
    public int filterOrder() {
        //执行顺序
        return 0;
    }

    @Override
    public String filterType() {
        //过滤器执行阶段的类型
        return FilterConstants.ROUTE_TYPE;
    }

    /**
     * 设置 401 无权限状态
     */
    private void setUnauthorizedResponse(RequestContext requestContext, String msg) {
        requestContext.setSendZuulResponse(false);
        requestContext.setResponseStatusCode(HttpStatus.UNAUTHORIZED.value());
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setCode("1");
        resultDTO.setMsg(msg);
        String str = JSONObject.fromObject(resultDTO).toString();
        requestContext.setResponseBody(str);
    }
}