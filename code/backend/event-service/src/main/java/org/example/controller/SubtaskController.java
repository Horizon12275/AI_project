package org.example.controller;

import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.service.SubtaskService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/subtask")
public class SubtaskController {
    private final SubtaskService service;
    public SubtaskController(SubtaskService service) {
        this.service = service;
    }
    //修改某一个子任务为完成状态或未完成状态
    @PutMapping("/changeDone/{id}")
    public Result<Subtask> changeStatus(@PathVariable int id, @RequestParam int uid) {
        return service.changeDone(id,uid);
    }
    //删除某一个子任务
    @DeleteMapping("/delete/{id}")
    public Result<String> deleteSubtask(@PathVariable int id, @RequestParam int uid) {
        return service.deleteSubtask(id, uid);
    }
    //为某一个事件添加一个子任务
    @PostMapping("/add/{eid}")
    public Result<Subtask> addSubtask(@PathVariable int eid, @RequestParam String content, @RequestParam LocalDate deadline, @RequestParam int uid) {
        return service.addSubtask(eid, content, deadline, uid);
    }
}
