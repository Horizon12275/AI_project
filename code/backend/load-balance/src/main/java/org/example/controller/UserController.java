package org.example.controller;


import org.example.client.Client;
import org.example.entity.RegisterRequest;
import org.example.entity.Result;
import org.example.entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final Client client;
    public UserController(Client client) {
        this.client = client;
    }
    @PostMapping("/login")//登录
    public Object login(@RequestParam("username") String username, @RequestParam("password") String password) {
        return client.login(username, password);
    }
    @GetMapping("/logout")//登出
    public Object logout() {
        return client.logout();
    }
    @GetMapping("/get")//获取当前登录用户的信息
    public Result<User> get() {
        return client.get();
    }
    @PostMapping("/register")//注册
    public Result<User> register(@RequestBody RegisterRequest request) {
        return client.register(request);
    }
    @PostMapping("/portrait")//提交个人肖像
    public Result<User> portrait(@RequestBody User user) {
        return client.portrait(user);
    }
    @GetMapping("/testGET")//测试GET请求
    public String testGET() {
        return "GET请求成功";
    }
    @PostMapping("/testPOST")//测试POST请求
    public String testPOST() {
        return "POST请求成功";
    }

}
