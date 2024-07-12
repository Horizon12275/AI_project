package org.example.backend.controller;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;
import org.example.backend.service.Impl.MyUserDetailsService;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final MyUserDetailsService service;
    public UserController(MyUserDetailsService service) {
        this.service = service;
    }
    @GetMapping("/get")//获取当前登录用户的信息
    public Result<User> get() {
        UserDetails user =(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return service.getUserByUsername( user.getUsername());
    }
    @GetMapping("/get/{uid}")//根据用户名获取用户信息 一般是用于查看别人的信息
    public Result<org.example.backend.entity.User> get(@PathVariable int uid) {
        return service.getUserById(uid);
    }


}
