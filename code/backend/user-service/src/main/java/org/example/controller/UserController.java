package org.example.controller;


import org.example.entity.RegisterRequest;
import org.example.entity.Result;
import org.example.entity.User;
import org.example.service.Impl.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final MyUserDetailsService service;
    @Value("${server.port}")
    private String port;
    public UserController(MyUserDetailsService service) {
        this.service = service;
    }
    @GetMapping("/get")//获取当前登录用户的信息
    public Result<User> get() {
        UserDetails user =(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();//注意security的user中的username是自定义user的email
        return service.getUserByEmail(user.getUsername());
    }
    @PostMapping("/register")//注册
    public Result<User> register(@RequestBody RegisterRequest request) {
        return service.addUser(request);
    }
    @PostMapping("/update")//更新用户信息
    public Result<User> update(@RequestBody User user) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return service.updateUserByEmail(user, username);
    }
    @GetMapping("/testGET")//测试GET请求
    public String testGET() {
        return "GET请求成功,端口号为"+port;
    }
    @PostMapping("/testPOST")//测试POST请求
    public String testPOST() {
        return "POST请求成功,端口号为"+port;
    }

}
