package org.example.backend.repository;

import org.example.backend.entity.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class EventRepoTest {

    @Autowired
    private EventRepo eventRepo;

    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
        event.setTitle("Test Event");
        event.setDetails("Details of Test Event");
        event.setCategory(Event.categoryT.Work_and_Study);
        event.setLocation("Test Location");
        event.setPriority(1);
        event.setStart(LocalDateTime.now());
        event.setEnd(LocalDateTime.now().plusHours(1));
    }

    @Test
    void testSaveEvent() {
        Event savedEvent = eventRepo.save(event);
        assertNotNull(savedEvent.getId());
        assertEquals("Test Event", savedEvent.getTitle());
    }

    @Test
    void testFindById() {
        Event savedEvent = eventRepo.save(event);
        Optional<Event> foundEvent = eventRepo.findById(savedEvent.getId());
        assertTrue(foundEvent.isPresent());
        assertEquals("Test Event", foundEvent.get().getTitle());
    }

    @Test
    void testFindAll() {
        eventRepo.save(event);
        List<Event> events = eventRepo.findAll();
        assertFalse(events.isEmpty());
    }

    @Test
    void testDelete() {
        Event savedEvent = eventRepo.save(event);
        eventRepo.delete(savedEvent);
        Optional<Event> foundEvent = eventRepo.findById(savedEvent.getId());
        assertFalse(foundEvent.isPresent());
    }
}
