package org.example.backend.service;

import org.example.backend.entity.Event;
import org.example.backend.entity.Result;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    int[] getNumsByMonth(int year, int month);

    List<Event> getEventsByDate(LocalDate date);

    Result<Event> addEvent(Event event);
}
