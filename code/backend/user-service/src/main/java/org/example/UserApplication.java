package org.example;


//import co.elastic.apm.attach.ElasticApmAttacher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;


@SpringBootApplication
@EnableFeignClients
@EnableRedisHttpSession
public class UserApplication {
    public static void main(String[] args) {
//        ElasticApmAttacher.attach();
        SpringApplication.run(UserApplication.class, args);
    }

}
