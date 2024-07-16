package org.example.service.Impl;


import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.EventRepo;
import org.example.repository.SubtaskRepo;
import org.example.service.SubtaskService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubtaskServiceImpl implements SubtaskService {
    private final SubtaskRepo repo;
    private final EventRepo eventRepo;
    public SubtaskServiceImpl(SubtaskRepo repo, EventRepo eventRepo) {
        this.repo = repo;
        this.eventRepo = eventRepo;
    }
    @Override
    public Result<Subtask> changeDone(int id, int uid) {
        Subtask subtask = repo.findById(id).orElse(null);
        if (subtask == null) {
            return Result.error(404, "Subtask not found");
        }
        if(subtask.getEvent().getUid() != uid){
            return Result.error(403, "Permission denied");
        }
        subtask.setDone(!subtask.isDone());
        repo.save(subtask);
        return Result.success(subtask);
    }
    @Override
    public Result<String> deleteSubtask(int id, int uid) {
        Subtask subtask = repo.findById(id).orElse(null);
        if (subtask == null) {
            return Result.error(404, "Subtask not found");
        }
        if(subtask.getEvent().getUid() != uid){
            return Result.error(403, "Permission denied");
        }
        repo.deleteById(id);
        return Result.success("Delete success");
    }
    @Override
    public Result<Subtask> addSubtask(int eid, String content, LocalDate deadline, int uid) {
        Event event = eventRepo.findById(eid).orElse(null);
        if(event == null){
            return Result.error(404, "Event not found");
        }
        if(event.getUid() != uid){
            return Result.error(403, "Permission denied");
        }
        Subtask subtask = new Subtask();
        subtask.setContent(content);
        subtask.setDdl(deadline);
        subtask.setEvent(event);
        subtask.setDone(false);
        return Result.success(repo.save(subtask));
    }
}
