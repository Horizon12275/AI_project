package org.example.controller;

import com.alibaba.fastjson2.JSONObject;
import org.example.entity.Event;
import org.example.entity.EventDetails;
import org.example.entity.Result;
import org.example.entity.Summary;
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
    public Result<int[]> getNums(@RequestParam int year, @RequestParam int month) {
        return service.getNumsByMonth(year, month);
    }
    //获取某一天的所有事件 返回一个事件数组
    @GetMapping("/getEvents")
    public Result<List<Event>> getEvents(@RequestParam LocalDate date) {
        return service.getEventsByDate(date);
    }
    //添加一个新的事件
    @PostMapping("/add_online")
    public Result<Event> addEventOnline(@RequestBody JSONObject jsonObject) {
        Event event = jsonObject.getObject("event", Event.class);
        EventDetails eventDetails = jsonObject.getObject("eventDetails", EventDetails.class);

        return service.addEventOnline(event,eventDetails);
    }
    @PostMapping("/add")
    public Result<Event> addEvent(@RequestBody Event event) {
        return service.addEvent(event);
    }
    @DeleteMapping("/delete/{id}")
    public Result<String> deleteEvent(@PathVariable int id) {
        return service.deleteEvent(id);
    }
    @PostMapping("/update/{id}")
    public Result<Event> updateEvent(@PathVariable int id, @RequestBody Event event) {
        return service.updateEvent(id, event);
    }
    @GetMapping("/summary")
    public Result<Summary> summary(@RequestParam LocalDate start, @RequestParam LocalDate end) {
        return service.summary(start,end);
    }
    @PostMapping("/pushAll")
    public Result<List<Event>> pushAll(@RequestBody List<Event> events) {
        return service.pushAll(events);
    }
}
