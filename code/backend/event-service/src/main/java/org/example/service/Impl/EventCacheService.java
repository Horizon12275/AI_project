package org.example.service.Impl;

import org.example.entity.Event;
import org.example.entity.Reminder;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.EventRepo;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventCacheService {
    private final EventRepo repo;
    public EventCacheService(EventRepo repo) {
        this.repo = repo;
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#event.ddl.getYear()+'-'+#event.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#event.ddl+'-'+#uid")
    })
    public Result<Event> addEvent(Event event, int uid) {
        event.setUid(uid);
        if (event.getSubtasks() != null)
            event.getSubtasks().forEach(subtask -> subtask.setEvent(event));//设置subtask的event属性 否则保存的subtask中的eid为空
        if (event.getReminders() != null)
            event.getReminders().forEach(reminder -> reminder.setEvent(event));//设置reminder的event属性 否则保存的reminder中的eid为空
        repo.save(event);
        return Result.success(event);
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#oldEvent.ddl.getYear()+'-'+#oldEvent.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#oldEvent.ddl+'-'+#uid")
    })//为了使用缓存 拆分了删除事件的方法
    public Result<String> deleteEvent(int id, int uid, Event oldEvent){
        repo.deleteById(id);
        return Result.success("Successfully deleted");
    }
    @Caching(evict = {
            @CacheEvict(value = "eventNums", key = "#oldEvent.ddl.getYear()+'-'+#oldEvent.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#oldEvent.ddl+'-'+#uid"),
            @CacheEvict(value = "eventNums", key = "#event.ddl.getYear()+'-'+#event.ddl.getMonthValue()+'-'+#uid"),
            @CacheEvict(value = "events", key = "#event.ddl+'-'+#uid")
    })//为了使用缓存 拆分了更新事件的方法 因为update会影响两个月的缓存 所以都要删除
    public Result<Event> updateEvent(int id, Event event, int uid, Event oldEvent){
        //为了避免前端传入的event中的属性为null导致覆盖原有数据 逐个判断是否为null 不知道有没有更好的方法
        if (event.getTitle() != null) {
            oldEvent.setTitle(event.getTitle());
        }
        if (event.getCategory() != null) {
            oldEvent.setCategory(event.getCategory());
        }
        if (event.getStartTime() != null) {
            oldEvent.setStartTime(event.getStartTime());
        }
        if (event.getEndTime() != null) {
            oldEvent.setEndTime(event.getEndTime());
        }
        if (event.getDdl() != null) {
            oldEvent.setDdl(event.getDdl());
        }
        if(event.getDetails()!=null){
            oldEvent.setDetails(event.getDetails());
        }
        if(event.getLocation()!=null){
            oldEvent.setLocation(event.getLocation());
        }
        if(event.getPriority()!=null){
            oldEvent.setPriority(event.getPriority());
        }
        if(event.getReminders()!=null){
            List<Reminder> reminders = oldEvent.getReminders();
            reminders.clear();
            reminders.addAll(event.getReminders());
            oldEvent.getReminders().forEach(reminder -> reminder.setEvent(oldEvent));
        }
        if (event.getSubtasks() != null) {
            List<Subtask> subtasks = oldEvent.getSubtasks();
            subtasks.clear();
            subtasks.addAll(event.getSubtasks());
            oldEvent.getSubtasks().forEach(subtask -> subtask.setEvent(oldEvent));
        }
        repo.save(oldEvent);
        return Result.success(oldEvent);
    }
}
