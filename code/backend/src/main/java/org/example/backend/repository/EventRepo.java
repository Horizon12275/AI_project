package org.example.backend.repository;

import org.example.backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    public List<Event> getEventsByDateAfterAndDateBeforeAndUserId(LocalDate start, LocalDate end, int uid);
    public List<Event> getEventsByDateAndUserId(LocalDate date, int uid);


}
