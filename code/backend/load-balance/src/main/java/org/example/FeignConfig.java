package org.example;

import feign.FeignException;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import feign.Response;
import feign.codec.Decoder;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.HttpMessageConverterCustomizer;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ObjectUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collection;

@Configuration
public class FeignConfig extends SpringDecoder implements RequestInterceptor,Decoder {


    public FeignConfig(ObjectFactory<HttpMessageConverters> messageConverters, ObjectProvider<HttpMessageConverterCustomizer> customizers) {
        super(messageConverters, customizers);
    }

    @Override
            public void apply(RequestTemplate requestTemplate) {
                ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                if (attributes != null) {
                    HttpServletRequest request = attributes.getRequest();
                    //添加token
                    requestTemplate.header("Cookie", request.getHeader("Cookie"));
                }
            }



            @Override
            public Object decode(Response response, Type type) throws FeignException, IOException {
                ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                if(attributes != null) {
                    HttpServletResponse myResponse = attributes.getResponse();
                    //添加Set-Cookie
                    Collection<String> cookies = response.headers().get("Set-Cookie");
                    if (!ObjectUtils.isEmpty(cookies)) {
                        cookies.stream().forEach(cookie -> {
                            myResponse.addHeader("Set-Cookie", cookie); // 需要再拦截器中异常当前应用的session,否则存在两个，后添加的会生效
                        });
                    }
                }

                return super.decode(response, type);
            }



}
