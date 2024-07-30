package org.example.controller;

import org.example.client.Client;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/subtask")
public class SubtaskController {
    private Client client;
    public SubtaskController(Client client) {
        this.client = client;
    }
    //修改某一个子任务为完成状态或未完成状态
    @PutMapping("/changeDone/{id}")
    public Result<Subtask> changeDone(@PathVariable int id) {
        return client.changeDone(id);
    }
    //删除某一个子任务
    @DeleteMapping("/delete/{id}")
    public Result<String> deleteSubtask(@PathVariable int id) {
        return client.deleteSubtask(id);
    }
    //为某一个事件添加一个子任务
    @PostMapping("/add/{eid}")
    public Result<Subtask> addSubtask(@PathVariable int eid, @RequestParam String content, @RequestParam LocalDate deadline) {
        return client.addSubtask(eid, content, deadline);
    }
}
