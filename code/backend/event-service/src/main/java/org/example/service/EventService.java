package org.example.service;


import org.example.entity.Event;
import org.example.entity.Result;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    int[] getNumsByMonth(int year, int month, int uid);
    List<Event> getEventsByDate(LocalDate date, int uid);
    Result<Event> addEvent(Event event, int uid);
    Result<List<Object>> summary(LocalDate start, LocalDate end, int uid);
    Result<Event> updateEvent(int id, Event event, int uid);
    Result<List<Event>> pushAll(List<Event> events,int uid);
    Result<String> deleteEvent(int id, int uid);
}
