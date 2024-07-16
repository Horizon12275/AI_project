package org.example.service.Impl;


import org.example.client.EventClient;
import org.example.entity.Event;
import org.example.entity.Result;
import org.example.repository.UserRepo;
import org.example.service.EventService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventClient client;
    private final UserRepo userRepo;
    public EventServiceImpl(EventClient client, UserRepo userRepo) {
        this.client = client;
        this.userRepo = userRepo;
    }
    public int getUid() {//从数据库里查询id
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepo.findUserByUsername(username).getId();
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
    public Result<Event> addEvent(Event event) {
        return client.addEvent(event, getUid());
    }
}
