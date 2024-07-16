package org.example.service.Impl;


import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.EventRepo;
import org.example.service.EventService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepo repo;
    public EventServiceImpl(EventRepo repo) {
        this.repo = repo;
    }
    @Override
    public int[] getNumsByMonth(int year, int month, int uid) {
        int[] res = new int[31];
        List<Event> events = repo.getEventsByDateAfterAndDateBeforeAndUid(java.time.LocalDate.of(year, month, uid), java.time.LocalDate.of(year, month, 1).plusMonths(1), 1);
        for (Event event : events) {
            res[event.getDate().getDayOfMonth() - 1]++;
        }
        return res;
    }
    @Override
    public List<Event> getEventsByDate(LocalDate date,int uid) {
        return repo.getEventsByDateAndUid(date, uid);
    }
    @Override
    public Result<Event> addEvent(Event event, int uid) {
        event.setUid(uid);
        List<Subtask> subtasks = event.getSubtasks();
        for (Subtask subtask : subtasks) {
            subtask.setEvent(event);//设置子任务的事件 否则subtask表中的eid为null
        }
        repo.save(event);
        return Result.success(event);
    }
}
