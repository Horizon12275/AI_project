package org.example.backend.repository;

import org.example.backend.entity.Event;
import org.example.backend.entity.Reminder;
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
class ReminderRepoTest {

    @Autowired
    private ReminderRepo reminderRepo;

    @Autowired
    private EventRepo eventRepo;

    private Reminder reminder;
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
        event = eventRepo.save(event);

        reminder = new Reminder();
        reminder.setContent("Test Reminder");
        reminder.setDone(false);
        reminder.setEvent(event);
    }

    @Test
    void testSaveReminder() {
        Reminder savedReminder = reminderRepo.save(reminder);
        assertNotNull(savedReminder.getId());
        assertEquals("Test Reminder", savedReminder.getContent());
        assertNotNull(savedReminder.getEvent());
        assertEquals(event.getId(), savedReminder.getEvent().getId());
    }

    @Test
    void testFindById() {
        Reminder savedReminder = reminderRepo.save(reminder);
        Optional<Reminder> foundReminder = reminderRepo.findById(savedReminder.getId());
        assertTrue(foundReminder.isPresent());
        assertEquals("Test Reminder", foundReminder.get().getContent());
        assertNotNull(foundReminder.get().getEvent());
        assertEquals(event.getId(), foundReminder.get().getEvent().getId());
    }

    @Test
    void testFindAll() {
        reminderRepo.save(reminder);
        List<Reminder> reminders = reminderRepo.findAll();
        assertFalse(reminders.isEmpty());
        assertNotNull(reminders.get(0).getEvent());
        assertEquals(event.getId(), reminders.get(0).getEvent().getId());
    }

    @Test
    void testDelete() {
        Reminder savedReminder = reminderRepo.save(reminder);
        reminderRepo.delete(savedReminder);
        Optional<Reminder> foundReminder = reminderRepo.findById(savedReminder.getId());
        assertFalse(foundReminder.isPresent());
    }
}
