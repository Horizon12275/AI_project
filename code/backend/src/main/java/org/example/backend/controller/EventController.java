package org.example.backend.controller;

import org.example.backend.entity.Event;
import org.example.backend.entity.Result;
import org.example.backend.repository.UserRepo;
import org.example.backend.service.EventService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {
    private final EventService service;
    public EventController(EventService service) {
        this.service = service;
    }
    //获取某一个月的每一天的事件数量 返回一个数组
    @GetMapping("/getNums")
    public Result<int[]> getNums(@RequestParam int year, @RequestParam int month) {
        return Result.success(service.getNumsByMonth(year, month));
    }
    //获取某一天的所有事件 返回一个事件数组
    @GetMapping("/getEvents")
    public Result<List<Event>> getEvents(@RequestParam LocalDate date) {
        return Result.success(service.getEventsByDate(date));
    }
    //添加一个新的事件
    @PostMapping("/add")
    public Result<Event> addEvent(@RequestBody Event event) {
        return service.addEvent(event);
    }
}
