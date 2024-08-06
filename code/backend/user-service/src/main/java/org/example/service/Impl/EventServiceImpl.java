package org.example.service.Impl;


import org.example.client.AIClient;
import org.example.client.EventClient;
import org.example.constant.ConstMaps;
import org.example.entity.*;
import org.example.repository.UserRepo;
import org.example.service.EventService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventClient client;
    private final AIClient aiClient;
    private final UserRepo userRepo;
    private final ConstMaps constMaps;
    public EventServiceImpl(EventClient client, UserRepo userRepo, ConstMaps constMaps, AIClient aiClient) {
        this.client = client;
        this.userRepo = userRepo;
        this.constMaps = constMaps;
        this.aiClient = aiClient;
    }
    public int getUid() {//从数据库里查询id
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepo.findUserByEmail(email).getId();
    }
    @Override
    public Result<int[]> getNumsByMonth(int year, int month) {
        return client.getNums(year, month, getUid());
    }
    @Override
    public Result<List<Event>> getEventsByDate(LocalDate date) {
        return client.getEvents(date, getUid());
    }
    @Override
    public Result<Event> addEventOnline(Event event, EventDetails eventDetails) {
        User user = userRepo.findById(getUid()).orElse(null);
        // set user details
        UserPortrait userPortrait = new UserPortrait(
                constMaps.getIdentityMap().get(user.getIdentity()),
                constMaps.getSleepScheduleMap().get(user.getSleep_schedule()),
                constMaps.getChallengeMap().get(user.getChallenge()));
        aiClient.setUserDetails(userPortrait);
        // generate reminders and subtasks from AI
        String[] reminderContents= aiClient.generateReminders(eventDetails);
        List<Subtask> subtaskContents = aiClient.generateSubtasks(eventDetails);
        Integer priority = Integer.parseInt(aiClient.generatePriority(eventDetails));

        int id=client.addEvent(event, getUid()).getData().getId();//添加事件 下一次请求时才能保存用户选择保留的子任务和提醒 另外需要保存id 用于前端后续发起请求更新此事件

        List<Reminder> reminders=new ArrayList<>();
        List<Subtask> subtasks=new ArrayList<>();
        for (String reminderContent : reminderContents) {
            Reminder reminder = new Reminder();
            reminder.setContent(reminderContent);
            reminder.setDone(false);
            reminder.setEvent(event);
            reminders.add(reminder);
        }
        for (Subtask subtaskContent : subtaskContents) {
            Subtask subtask = new Subtask();
            subtask.setContent(subtaskContent.getContent());
            subtask.setDone(false);
            subtask.setEvent(event);
            subtask.setDdl(subtaskContent.getDdl());
            subtasks.add(subtask);
        }
        event.setPriority(priority);
        event.setReminders(reminders);
        event.setSubtasks(subtasks);
        event.setId(id);
        return Result.success(event);
    }
    @Override
    public Result<String> deleteEvent(@PathVariable("id") int id) {
        return client.deleteEvent(id, getUid());
    }
    @Override
    public Result<Event> updateEvent(@PathVariable("id") int id, @RequestBody Event event) {
        return client.updateEvent(id, event, getUid());
    }
    @Override
    public Result<Summary> summary(LocalDate start, LocalDate end) {
        return client.summary(start, end, getUid());
    }
    @Override
    public Result<List<Event>> pushAll(List<Event> events) {
        return client.pushAll(events,getUid());
    }
}
