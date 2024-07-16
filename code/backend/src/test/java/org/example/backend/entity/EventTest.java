package org.example.backend.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class EventTest {

    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
    }

    @AfterEach
    void tearDown() {
        event = null;
    }

    @Test
    void getId() {
        event.setId(1);
        assertEquals(1, event.getId());
    }

    @Test
    void getTitle() {
        event.setTitle("Test Event");
        assertEquals("Test Event", event.getTitle());
    }

    @Test
    void getDetails() {
        event.setDetails("Event Details");
        assertEquals("Event Details", event.getDetails());
    }

    @Test
    void getCategory() {
        event.setCategory(Event.categoryT.Work_and_Study);
        assertEquals(Event.categoryT.Work_and_Study, event.getCategory());
    }

    @Test
    void getLocation() {
        event.setLocation("Test Location");
        assertEquals("Test Location", event.getLocation());
    }

    @Test
    void getPriority() {
        event.setPriority(5);
        assertEquals(5, event.getPriority());
    }

    @Test
    void getStart() {
        LocalDateTime start = LocalDateTime.now();
        event.setStart(start);
        assertEquals(start, event.getStart());
    }

    @Test
    void getEnd() {
        LocalDateTime end = LocalDateTime.now();
        event.setEnd(end);
        assertEquals(end, event.getEnd());
    }

    @Test
    void getUser() {
        User user = new User();
        event.setUser(user);
        assertEquals(user, event.getUser());
    }

    @Test
    void getSubtasks() {
        List<Subtask> subtasks = new ArrayList<>();
        event.setSubtasks(subtasks);
        assertEquals(subtasks, event.getSubtasks());
    }

    @Test
    void getReminders() {
        List<Reminder> reminders = new ArrayList<>();
        event.setReminders(reminders);
        assertEquals(reminders, event.getReminders());
    }

    @Test
    void setId() {
        event.setId(1);
        assertEquals(1, event.getId());
    }

    @Test
    void setTitle() {
        event.setTitle("Test Event");
        assertEquals("Test Event", event.getTitle());
    }

    @Test
    void setDetails() {
        event.setDetails("Event Details");
        assertEquals("Event Details", event.getDetails());
    }

    @Test
    void setCategory() {
        event.setCategory(Event.categoryT.Work_and_Study);
        assertEquals(Event.categoryT.Work_and_Study, event.getCategory());
    }

    @Test
    void setLocation() {
        event.setLocation("Test Location");
        assertEquals("Test Location", event.getLocation());
    }

    @Test
    void setPriority() {
        event.setPriority(5);
        assertEquals(5, event.getPriority());
    }

    @Test
    void setStart() {
        LocalDateTime start = LocalDateTime.now();
        event.setStart(start);
        assertEquals(start, event.getStart());
    }

    @Test
    void setEnd() {
        LocalDateTime end = LocalDateTime.now();
        event.setEnd(end);
        assertEquals(end, event.getEnd());
    }

    @Test
    void setUser() {
        User user = new User();
        event.setUser(user);
        assertEquals(user, event.getUser());
    }

    @Test
    void setSubtasks() {
        List<Subtask> subtasks = new ArrayList<>();
        event.setSubtasks(subtasks);
        assertEquals(subtasks, event.getSubtasks());
    }

    @Test
    void setReminders() {
        List<Reminder> reminders = new ArrayList<>();
        event.setReminders(reminders);
        assertEquals(reminders, event.getReminders());
    }

    @Test
    void testEquals() {
        Event event1 = new Event(1, "Title", "Details", Event.categoryT.Work_and_Study, "Location", 1, LocalDateTime.now(), LocalDateTime.now(), new User(), new ArrayList<>(), new ArrayList<>());
        Event event2 = new Event(1, "Title", "Details", Event.categoryT.Work_and_Study, "Location", 1, LocalDateTime.now(), LocalDateTime.now(), new User(), new ArrayList<>(), new ArrayList<>());
        assertEquals(event1, event2);
    }

    @Test
    void canEqual() {
        Event event1 = new Event();
        Event event2 = new Event();
        assertTrue(event1.canEqual(event2));
    }

    @Test
    void testHashCode() {
        Event event1 = new Event(1, "Title", "Details", Event.categoryT.Work_and_Study, "Location", 1, LocalDateTime.now(), LocalDateTime.now(), new User(), new ArrayList<>(), new ArrayList<>());
        Event event2 = new Event(1, "Title", "Details", Event.categoryT.Work_and_Study, "Location", 1, LocalDateTime.now(), LocalDateTime.now(), new User(), new ArrayList<>(), new ArrayList<>());
        assertEquals(event1.hashCode(), event2.hashCode());
    }

    @Test
    void testToString() {
        Event event = new Event(1, "Title", "Details", Event.categoryT.Work_and_Study, "Location", 1, LocalDateTime.now(), LocalDateTime.now(), new User(), new ArrayList<>(), new ArrayList<>());
        String expected = "Event(id=1, title=Title, details=Details, category=Work_and_Study, location=Location, priority=1, start=" + event.getStart() + ", end=" + event.getEnd() + ", user=" + event.getUser() + ", subtasks=[], reminders=[])";
        assertEquals(expected, event.toString());
    }
}
