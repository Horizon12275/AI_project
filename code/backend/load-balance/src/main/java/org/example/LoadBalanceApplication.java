package org.example;


import co.elastic.apm.attach.ElasticApmAttacher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;



@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableFeignClients
public class LoadBalanceApplication {
    public static void main(String[] args) {
        ElasticApmAttacher.attach(); //添加此句
        SpringApplication.run(LoadBalanceApplication.class, args);
    }

}
