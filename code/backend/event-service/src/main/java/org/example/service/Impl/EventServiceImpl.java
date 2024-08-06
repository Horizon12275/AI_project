package org.example.service.Impl;


import org.example.entity.Event;
import org.example.entity.Result;
import org.example.repository.EventRepo;
import org.example.service.EventService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepo repo;
    private final EventCacheService cacheService;
    public EventServiceImpl(EventRepo repo, EventCacheService cacheService) {
        this.repo = repo;
        this.cacheService = cacheService;
    }
    @Override
    public int[] getNumsByMonth(int year, int month, int uid) {
        int[] res = new int[31];
        List<Event> events = repo.getEventsByDdlBetweenAndUid(java.time.LocalDate.of(year, month, 1), java.time.LocalDate.of(year, month, 1).plusMonths(1), uid);
        for (Event event : events) {
            res[event.getDdl().getDayOfMonth() - 1]++;
        }
        return res;
    }
    @Override
    public List<Event> getEventsByDate(LocalDate date,int uid) {
        return repo.getEventsByDdlAndUid(date, uid);
    }
    @Override
    public Result<Event> addEvent(Event event, int uid) {
        return cacheService.addEvent(event,uid);
    }
    @Override
    public Result<String> deleteEvent(int id, int uid) {
        Event oldEvent = repo.findById(id).orElse(null);
        if (oldEvent == null) {
            return Result.error(404, "Event not found");
        }
        if (oldEvent.getUid() != uid) {
            return Result.error(403, "Permission denied");
        }
        return cacheService.deleteEvent(id,uid,oldEvent);
    }
    @Override
    public Result<Event> updateEvent(int id, Event event, int uid) {
        Event oldEvent = repo.findById(id).orElse(null);
        if (oldEvent == null) {
            return Result.error(404, "Event not found");
        }
        if (oldEvent.getUid() != uid) {
            return Result.error(403, "Permission denied");
        }
        return cacheService.updateEvent(id,event,uid,oldEvent);
    }
    @Override
    public Result<List<Object>> summary(LocalDate start, LocalDate end, int uid) {
        List<Event> events = repo.getEventsByDdlBetweenAndUid(start, end, uid);

        // 统计各个 category 的总时间
        Map<Integer, Long> categoryTotalTime = new HashMap<>();
        long totalDuration = 0;

        for (Event event : events) {
            Integer category = event.getCategory();
            if(event.getEndTime() == null||event.getStartTime() == null){//如果开始时间或结束时间为空则跳过
                continue;
            }
            long duration = Duration.between(event.getStartTime(), event.getEndTime()).toMinutes();
            // 累加每个 category 的总时间
            categoryTotalTime.put(category, categoryTotalTime.getOrDefault(category, 0L) + duration);
            totalDuration += duration;
        }

        // 计算各个 category 的时间占比并构建结果数组
        List<Object> result = new ArrayList<>();
        for (Map.Entry<Integer, Long> entry : categoryTotalTime.entrySet()) {
            Integer category = entry.getKey();
            long duration = entry.getValue();
            double percentage = (double) duration / totalDuration * 100;

            // 构建每个 category 的占比对象
            Map<String, Object> categoryPercentage = new HashMap<>();
            categoryPercentage.put("category", category);
            categoryPercentage.put("percentage", percentage);

            result.add(categoryPercentage);
        }

        return Result.success(result);
    }
    @Override
    public Result<List<Event>> pushAll(List<Event> events, int uid) {
        for (Event event : events) {//遍历所有事件 逐个添加或更新
           if(event.getId()==null) addEvent(event,uid);//如果id为空则添加
           else if(event.getTitle()==null) deleteEvent(event.getId(),uid);//如果title为空则删除 约定
           else updateEvent(event.getId(),event,uid);//否则更新
        }
        List<Event> allEvents = repo.getEventsByUid(uid);//返回所有事件
        return Result.success(allEvents);
    }
}
