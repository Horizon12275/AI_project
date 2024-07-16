package org.example.backend.repository;

import org.example.backend.entity.Reminder;
import org.example.backend.entity.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class ReminderRepoTest {

    @Autowired
    private ReminderRepo reminderRepo;

    private Reminder reminder;
    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
        event.setId(1);
        event.setTitle("Test Event");

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
    }

    @Test
    void testFindById() {
        Reminder savedReminder = reminderRepo.save(reminder);
        Optional<Reminder> foundReminder = reminderRepo.findById(savedReminder.getId());
        assertTrue(foundReminder.isPresent());
        assertEquals("Test Reminder", foundReminder.get().getContent());
    }

    @Test
    void testFindAll() {
        reminderRepo.save(reminder);
        List<Reminder> reminders = reminderRepo.findAll();
        assertFalse(reminders.isEmpty());
    }

    @Test
    void testDelete() {
        Reminder savedReminder = reminderRepo.save(reminder);
        reminderRepo.delete(savedReminder);
        Optional<Reminder> foundReminder = reminderRepo.findById(savedReminder.getId());
        assertFalse(foundReminder.isPresent());
    }
}
