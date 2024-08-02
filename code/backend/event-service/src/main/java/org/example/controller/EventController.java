package org.example.controller;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.service.EventService;
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
    public Result<int[]> getNums(@RequestParam int year, @RequestParam int month, @RequestParam int uid) {
        return Result.success(service.getNumsByMonth(year, month, uid));
    }
    //获取某一天的所有事件 返回一个事件数组
    @GetMapping("/getEvents")
    public Result<List<Event>> getEvents(@RequestParam LocalDate date, @RequestParam int uid) {
        return Result.success(service.getEventsByDate(date, uid));
    }
    //添加一个新的事件
    @PostMapping("/add")
    public Result<Event> addEvent(@RequestBody Event event,@RequestParam int uid) {
        return service.addEvent(event, uid);
    }
    @DeleteMapping("/delete/{id}")
    public Result<String> deleteEvent(@PathVariable int id,@RequestParam int uid) {
        return service.deleteEvent(id,uid);
    }
    @PostMapping("/update/{id}")
    public Result<Event> updateEvent(@PathVariable int id, @RequestBody Event event,@RequestParam int uid) {
        return service.updateEvent(id, event,uid);
    }
    //获取用户各个类别的日程时间占比
    @GetMapping("/summary")
    public Result<List<Object>> summary(@RequestParam LocalDate start,@RequestParam LocalDate end,@RequestParam int uid) {
        return service.summary(start,end,uid);
    }
    @PostMapping("/pushAll")
    public Result<List<Event>> pushAll(@RequestBody List<Event> events ,@RequestParam int uid) {
        return service.pushAll(events,uid);
    }
}
