package org.example.client;

import com.alibaba.fastjson2.JSONObject;
import org.example.entity.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@FeignClient("user-service")
public interface Client {
    //User
    @PostMapping("/api/user/login")
    public Object login(@RequestParam("username") String username, @RequestParam("password") String password);
    @GetMapping("/api/user/logout")
    public Object logout();
    @GetMapping("/api/user/get")
    public Result<User> get();
    @PostMapping("/api/user/register")
    public Result<User> register(@RequestBody RegisterRequest request);
    @PostMapping("/api/user/update")
    public Result<User> updateUser(@RequestBody User user);
    //Event
    @GetMapping("/api/event/getNums")
    public Result<int[]> getNums(@RequestParam("year") int year, @RequestParam("month") int month);
    @GetMapping("/api/event/getEvents")
    public Result<List<Event>> getEvents(@RequestParam("date") LocalDate date);
    @PostMapping("/api/event/add_online")
    Result<Event> addEventOnline(@RequestBody JSONObject jsonObject);
    @PostMapping("/api/event/add")
    Result<Event> addEvent(Event event);
    @DeleteMapping("/api/event/delete/{id}")
    public Result<String> deleteEvent(@PathVariable("id") int id);
    @PostMapping("/api/event/update/{id}")
    Result<Event> updateEvent(@PathVariable("id")int id, @RequestBody Event event);
    @GetMapping("/api/event/summary")
    public Result<Summary> summary(@RequestParam("start") LocalDate start, @RequestParam("end") LocalDate end);
    @PostMapping("/api/event/pushAll")
    Result<List<Event>> pushAll(@RequestBody List<Event> events);
    //Subtask
    @PutMapping("/api/subtask/changeDone/{id}")
    public Result<Subtask> changeDone(@PathVariable("id") int id);//传入当前登录用户的uid 用于权限验证 下类似
    @DeleteMapping("/api/subtask/delete/{id}")
    public Result<String> deleteSubtask(@PathVariable("id") int id);
    @PostMapping("/api/subtask/add/{eid}")
    public Result<Subtask> addSubtask(@PathVariable("eid") int eid, @RequestParam("content") String content, @RequestParam("deadline") LocalDate deadline);


}
