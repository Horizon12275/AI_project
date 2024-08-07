package org.example.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                // 配置接口文档基本信息
                .info(this.getApiInfo())
                ;
    }

    private Info getApiInfo() {
        return new Info()
                // 配置文档标题
                .title("TimeGenie后端接口文档")
                // 配置文档描述
                .description("TimeGenie接口文档描述")
                // 配置作者信息
                //.contact(new Contact().name("程序员").url("https://www.xiezhrspace.cn").email("1666397814@163.com"))
                // 配置License许可证信息
                //.license(new License().name("Apache 2.0").url("https://www.xiezhrspace.cn"))
                // 概述信息
                .summary("TimeGenie接口文档描述")
                //.termsOfService("https://www.xiezhrspace.cn")
                // 配置版本号
                .version("1.0");
    }
}
