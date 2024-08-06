package org.example.service.Impl;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.SubtaskRepo;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

@Service
public class SubtaskCacheService {
    private final SubtaskRepo repo;
    public SubtaskCacheService(SubtaskRepo repo) {
        this.repo = repo;
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#oldSubtask.event.ddl.getYear()+'-'+#oldSubtask.event.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#oldSubtask.event.ddl+'-'+#uid")
    })
    public Result<Subtask> changeDone(Subtask oldSubtask, int uid) {
        oldSubtask.setDone(!oldSubtask.isDone());
        repo.save(oldSubtask);
        return Result.success(oldSubtask);
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#oldSubtask.event.ddl.getYear()+'-'+#oldSubtask.event.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#oldSubtask.event.ddl+'-'+#uid")
    })
    public Result<String> deleteSubtask(int id, Subtask oldSubtask, int uid) {
        repo.deleteById(id);
        return Result.success("Successfully deleted");
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#subtask.event.ddl.getYear()+'-'+#subtask.event.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#subtask.event.ddl+'-'+#uid")
    })
    public Result<Subtask> addSubtask(Subtask subtask, int uid) {
        return Result.success(repo.save(subtask));
    }
}
