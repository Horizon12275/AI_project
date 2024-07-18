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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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
        UserPortrait userPortrait = new UserPortrait(
                constMaps.getIdentityMap().get(user.getIdentity()),
                constMaps.getSleepScheduleMap().get(user.getSleep_schedule()),
                constMaps.getChallengeMap().get(user.getChallenge()));
        aiClient.setUserDetails(userPortrait);
        String[] reminderContents= aiClient.generateReminders(eventDetails);
        String[] subtaskContents = aiClient.generateSubtasks(eventDetails);

        List<Reminder> reminders=new ArrayList<>();
        List<Subtask> subtasks=new ArrayList<>();
        for (String reminderContent : reminderContents) {
            Reminder reminder = new Reminder();
            reminder.setContent(reminderContent);
            reminder.setDone(false);
            reminder.setEvent(event);
            reminders.add(reminder);
        }
        for (String subtaskContent : subtaskContents) {
            Subtask subtask = new Subtask();
            subtask.setContent(subtaskContent);
            subtask.setDone(false);
            subtask.setEvent(event);
            subtask.setDdl(LocalDate.now());//
            subtasks.add(subtask);
        }
        event.setReminders(reminders);
        event.setSubtasks(subtasks);
        return client.addEvent(event, getUid());
    }
    @Override
    public Result<List<Object>> summary(LocalDate start, LocalDate end) {
        return client.summary(start, end, getUid());
    }
}
