package org.example.controller;

import com.alibaba.fastjson2.JSONObject;
import org.example.client.Client;
import org.example.entity.Event;
import org.example.entity.EventDetails;
import org.example.entity.Result;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {
    private final Client client;
    public EventController(Client client) {
        this.client = client;
    }
    //获取某一个月的每一天的事件数量 返回一个数组
    @GetMapping("/getNums")
    public Result<int[]> getNums(@RequestParam int year, @RequestParam int month) {
        return client.getNums(year, month);
    }
    //获取某一天的所有事件 返回一个事件数组
    @GetMapping("/getEvents")
    public Result<List<Event>> getEvents(@RequestParam LocalDate date) {
        return client.getEvents(date);
    }
    //添加一个新的事件
    @PostMapping("/add_online")
    public Result<Event> addEventOnline(@RequestBody JSONObject jsonObject) {
        return client.addEventOnline(jsonObject);
    }
    @DeleteMapping("/delete/{id}")
    public Result<String> deleteEvent(@PathVariable int id) {
        return client.deleteEvent(id);
    }
    @PostMapping("/update/{id}")
    public Result<Event> updateEvent(@PathVariable int id, @RequestBody Event event) {
        return client.updateEvent(id, event);
    }
    @GetMapping("/summary")
    public Result<List<Object>> summary(@RequestParam LocalDate start,@RequestParam LocalDate end) {
        return client.summary(start,end);
    }
    @PostMapping("/pushAll")
    public Result<List<Event>> pushAll(@RequestBody List<Event> events) {
        return client.pushAll(events);
    }
}
