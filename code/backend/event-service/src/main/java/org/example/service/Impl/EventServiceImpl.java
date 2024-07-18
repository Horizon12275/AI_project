package org.example.service.Impl;


import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
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
    public EventServiceImpl(EventRepo repo) {
        this.repo = repo;
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
        event.setUid(uid);
        List<Subtask> subtasks = event.getSubtasks();
        for (Subtask subtask : subtasks) {
            subtask.setEvent(event);//设置子任务的事件 否则subtask表中的eid为null
        }
        repo.save(event);
        return Result.success(event);
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

}
