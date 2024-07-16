package org.example.service;


import org.example.entity.Event;
import org.example.entity.Result;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    Result<int[]> getNumsByMonth(int year, int month);
    Result<List<Event>> getEventsByDate(LocalDate date);
    Result<Event> addEvent(Event event);
}
