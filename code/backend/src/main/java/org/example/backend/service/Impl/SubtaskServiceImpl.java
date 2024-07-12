package org.example.backend.service.Impl;

import org.example.backend.entity.Event;
import org.example.backend.entity.Result;
import org.example.backend.entity.Subtask;
import org.example.backend.repository.EventRepo;
import org.example.backend.repository.SubtaskRepo;
import org.example.backend.repository.UserRepo;
import org.example.backend.service.SubtaskService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubtaskServiceImpl implements SubtaskService {
    private final SubtaskRepo repo;
    private final EventRepo eventRepo;
    private final UserRepo userRepo;
    public SubtaskServiceImpl(SubtaskRepo repo, UserRepo userRepo, EventRepo eventRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
    }
    public int getUid() {//从数据库里查询id
        //String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        //return userRepo.findUserByUsername(username).getId();
        return 1;
    }
    @Override
    public Result<Subtask> changeDone(int id) {
        Subtask subtask = repo.findById(id).orElse(null);
        if (subtask == null) {
            return Result.error(404, "Subtask not found");
        }
        if(subtask.getEvent().getUser().getId() != getUid()){
            return Result.error(403, "Permission denied");
        }
        subtask.setDone(!subtask.isDone());
        repo.save(subtask);
        return Result.success(subtask);
    }
    @Override
    public Result<String> deleteSubtask(int id) {
        Subtask subtask = repo.findById(id).orElse(null);
        if (subtask == null) {
            return Result.error(404, "Subtask not found");
        }
        if(subtask.getEvent().getUser().getId() != getUid()){
            return Result.error(403, "Permission denied");
        }
        repo.deleteById(id);
        return Result.success("Delete success");
    }
    @Override
    public Result<Subtask> addSubtask(int eid, String content, LocalDate deadline) {
        Event event = eventRepo.findById(eid).orElse(null);
        if(event == null){
            return Result.error(404, "Event not found");
        }
        if(event.getUser().getId() != getUid()){
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
