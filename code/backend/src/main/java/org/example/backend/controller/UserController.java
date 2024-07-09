package org.example.backend.controller;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    public UserService service;
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Result<User> addUser(@RequestBody User user) {
        return service.addUser(user);
    }
    @GetMapping("/get")
    public Result<User> getUserByUsername(@RequestParam String username) throws ExecutionException, InterruptedException {
        return service.getUserByUsername(username);
    }
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test");
    }
}
