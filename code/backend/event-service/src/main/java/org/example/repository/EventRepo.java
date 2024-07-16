package org.example.repository;


import org.example.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    public List<Event> getEventsByDateAfterAndDateBeforeAndUid(LocalDate start, LocalDate end, int uid);
    public List<Event> getEventsByDateAndUid(LocalDate date, int uid);


}
