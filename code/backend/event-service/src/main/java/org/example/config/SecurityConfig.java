package org.example.config;


import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Configuration
public class SecurityConfig {
    List<IpAddressMatcher> hasIpAddress = new ArrayList<>();
    @Value("${myapp.allowed_ips}")
    private String allowed_ips;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //进行ip拦截设置
        hasIpAddress.add(new IpAddressMatcher("0:0:0:0:0:0:0:1"));//本地ip postman测试的ip是ipv6
        JSON.parseArray(allowed_ips).forEach(ip->{
            System.out.println(ip.toString());
            hasIpAddress.add(new IpAddressMatcher(ip.toString()));
        });

         http.authorizeHttpRequests((requests) ->{requests
                                .requestMatchers("/actuator/**").permitAll()
                                .requestMatchers("**").access((authentication, context) -> //对所有请求进行ip地址拦截
                                         new AuthorizationDecision(hasIpAddress.stream().map(ipAddressMatcher ->
                                         ipAddressMatcher.matches(context.getRequest())).reduce(false, Boolean::logicalOr)))
                                .requestMatchers(request -> Objects.equals(request.getHeader("Authorization"), "123")).permitAll()//对特定请求放行
                                .anyRequest()
                                .authenticated();
                        }
                )
               .exceptionHandling(
                        conf->{
                            conf.accessDeniedHandler(this::handleProcess);
                            conf.authenticationEntryPoint(this::handleProcess);
                        }
                ).csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
    private void handleProcess(
            HttpServletRequest request,
            HttpServletResponse response,
            Object exceptionOrAuthentication) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter writer = response.getWriter();

        if (exceptionOrAuthentication instanceof AuthenticationException authException) {
            // 如果是认证异常，则判断具体是用户名密码错误还是未登录
            if (authException instanceof BadCredentialsException) {
                // 用户名密码错误
                System.out.println(authException.getMessage());
                writer.write(Result.error(401, "Username or password error").asJsonString());
            } else {
                // 未登录
                writer.write(Result.error(401, "不允许从服务器外访问此服务！").asJsonString());
            }
        } else if (exceptionOrAuthentication instanceof AccessDeniedException) {
            // 权限不足
            System.out.println(exceptionOrAuthentication);
            writer.write(Result.error(403, "You do not have permission").asJsonString());
        } else if (exceptionOrAuthentication instanceof Authentication) {
            // 身份验证成功
            writer.write(Result.success((Authentication) exceptionOrAuthentication).asJsonString());
        } else {
            // 其他情况，返回通用错误信息
            writer.write(Result.error(500, "Unknown error").asJsonString());
        }
    }
    
}

