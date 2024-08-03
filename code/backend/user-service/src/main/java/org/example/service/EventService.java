package org.example.service;


import org.example.entity.Event;
import org.example.entity.EventDetails;
import org.example.entity.Result;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    Result<int[]> getNumsByMonth(int year, int month);
    Result<List<Event>> getEventsByDate(LocalDate date);
    Result<Event> addEventOnline(Event event, EventDetails eventDetails);

    Result<Event> updateEvent(@PathVariable("id") int id, @RequestBody Event event);

    Result<List<Object>> summary(LocalDate start, LocalDate end);

    Result<List<Event>> pushAll(List<Event> events);
}
