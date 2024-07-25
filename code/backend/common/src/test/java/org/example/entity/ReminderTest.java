package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ReminderTest {

    private Reminder reminder;

    @BeforeEach
    void setUp() {
        reminder = new Reminder();
    }

    @AfterEach
    void tearDown() {
        reminder = null;
    }

    @Test
    void getId() {
        reminder.setId(1);
        assertEquals(1, reminder.getId());
    }

    @Test
    void getContent() {
        reminder.setContent("Test Content");
        assertEquals("Test Content", reminder.getContent());
    }

    @Test
    void isDone() {
        reminder.setDone(true);
        assertTrue(reminder.isDone());
    }

    @Test
    void getEvent() {
        Event event = new Event();
        reminder.setEvent(event);
        assertEquals(event, reminder.getEvent());
    }

    @Test
    void setId() {
        reminder.setId(1);
        assertEquals(1, reminder.getId());
    }

    @Test
    void setContent() {
        reminder.setContent("Test Content");
        assertEquals("Test Content", reminder.getContent());
    }

    @Test
    void setDone() {
        reminder.setDone(true);
        assertTrue(reminder.isDone());
    }

    @Test
    void setEvent() {
        Event event = new Event();
        reminder.setEvent(event);
        assertEquals(event, reminder.getEvent());
    }

    @Test
    void testEquals() {
        Reminder reminder1 = new Reminder(1, "Content", true, new Event());
        Reminder reminder2 = new Reminder(1, "Content", true, new Event());
        assertEquals(reminder1, reminder2);
    }

    @Test
    void canEqual() {
        Reminder reminder1 = new Reminder();
        Reminder reminder2 = new Reminder();
        assertTrue(reminder1.canEqual(reminder2));
    }

    @Test
    void testHashCode() {
        Reminder reminder1 = new Reminder(1, "Content", true, new Event());
        Reminder reminder2 = new Reminder(1, "Content", true, new Event());
        assertEquals(reminder1.hashCode(), reminder2.hashCode());
    }

    @Test
    void testToString() {
        Reminder reminder = new Reminder(1, "Content", true, new Event());
        String expected = "Reminder(id=1, content=Content, isDone=true, event=" + reminder.getEvent() + ")";
        assertEquals(expected, reminder.toString());
    }
}
