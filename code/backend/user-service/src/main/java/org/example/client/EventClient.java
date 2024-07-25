package org.example.client;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@FeignClient("event-service")
public interface EventClient {
    //Event
    @GetMapping("/api/event/getNums")
    public Result<int[]> getNums(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("uid") int uid);
    @GetMapping("/api/event/getEvents")
    public Result<List<Event>> getEvents(@RequestParam("date") LocalDate date, @RequestParam("uid") int uid);
    @PostMapping("/api/event/add")
    public Result<Event> addEvent(@RequestBody Event event, @RequestParam("uid") int uid);
    @GetMapping("/api/event/summary")
    public Result<List<Object>> summary(@RequestParam("start") LocalDate start, @RequestParam("end") LocalDate end, @RequestParam("uid") int uid);
    //Subtask
    @PutMapping("/api/subtask/changeDone/{id}")
    public Result<Subtask> changeDone(@PathVariable("id") int id, @RequestParam("uid") int uid);//传入当前登录用户的uid 用于权限验证 下类似
    @DeleteMapping("/api/subtask/delete/{id}")
    public Result<String> deleteSubtask(@PathVariable("id") int id,@RequestParam("uid") int uid);
    @PostMapping("/api/subtask/add/{eid}")
    public Result<Subtask> addSubtask(@PathVariable("eid") int eid, @RequestParam("content") String content, @RequestParam("deadline") LocalDate deadline, @RequestParam("uid") int uid);
    @PostMapping("/api/event/update/{id}")
    Result<Event> updateEvent(@PathVariable("id")int id, @RequestBody Event event, @RequestParam("uid") int uid);
    @PostMapping("/api/event/pushAll")
    Result<List<Event>> pushAll(@RequestBody List<Event> events, @RequestParam("uid") int uid);
}
