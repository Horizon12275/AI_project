package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class EventTest {

    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event(
                1,
                "Meeting",
                "Project discussion",
                1,
                "Conference Room",
                2,
                LocalTime.of(10, 0),
                LocalTime.of(11, 0),
                LocalDate.of(2023, 7, 19),
                1001,
                new ArrayList<>(),
                new ArrayList<>()
        );
    }

    @AfterEach
    void tearDown() {
        event = null;
    }

    @Test
    void testNoArgsConstructor() {
        Event emptyEvent = new Event();
        assertNotNull(emptyEvent);
    }

    @Test
    void testAllArgsConstructor() {
        Event fullEvent = new Event(
                2,
                "Workshop",
                "Technical workshop",
                2,
                "Auditorium",
                1,
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                LocalDate.of(2023, 8, 1),
                1002,
                new ArrayList<>(),
                new ArrayList<>()
        );
        assertNotNull(fullEvent);
        assertEquals(2, fullEvent.getId());
        assertEquals("Workshop", fullEvent.getTitle());
        assertEquals("Technical workshop", fullEvent.getDetails());
        assertEquals(2, fullEvent.getCategory());
        assertEquals("Auditorium", fullEvent.getLocation());
        assertEquals(1, fullEvent.getPriority());
        assertEquals(LocalTime.of(14, 0), fullEvent.getStartTime());
        assertEquals(LocalTime.of(16, 0), fullEvent.getEndTime());
        assertEquals(LocalDate.of(2023, 8, 1), fullEvent.getDdl());
        assertEquals(1002, fullEvent.getUid());
        assertTrue(fullEvent.getSubtasks().isEmpty());
        assertTrue(fullEvent.getReminders().isEmpty());
    }

    @Test
    void getId() {
        assertEquals(1, event.getId());
    }

    @Test
    void getTitle() {
        assertEquals("Meeting", event.getTitle());
    }

    @Test
    void getDetails() {
        assertEquals("Project discussion", event.getDetails());
    }

    @Test
    void getCategory() {
        assertEquals(1, event.getCategory());
    }

    @Test
    void getLocation() {
        assertEquals("Conference Room", event.getLocation());
    }

    @Test
    void getPriority() {
        assertEquals(2, event.getPriority());
    }

    @Test
    void getStartTime() {
        assertEquals(LocalTime.of(10, 0), event.getStartTime());
    }

    @Test
    void getEndTime() {
        assertEquals(LocalTime.of(11, 0), event.getEndTime());
    }

    @Test
    void getDdl() {
        assertEquals(LocalDate.of(2023, 7, 19), event.getDdl());
    }

    @Test
    void getUid() {
        assertEquals(1001, event.getUid());
    }

    @Test
    void getSubtasks() {
        assertTrue(event.getSubtasks().isEmpty());
    }

    @Test
    void getReminders() {
        assertTrue(event.getReminders().isEmpty());
    }

    @Test
    void setId() {
        event.setId(2);
        assertEquals(2, event.getId());
    }

    @Test
    void setTitle() {
        event.setTitle("New Title");
        assertEquals("New Title", event.getTitle());
    }

    @Test
    void setDetails() {
        event.setDetails("New Details");
        assertEquals("New Details", event.getDetails());
    }

    @Test
    void setCategory() {
        event.setCategory(2);
        assertEquals(2, event.getCategory());
    }

    @Test
    void setLocation() {
        event.setLocation("New Location");
        assertEquals("New Location", event.getLocation());
    }

    @Test
    void setPriority() {
        event.setPriority(3);
        assertEquals(3, event.getPriority());
    }

    @Test
    void setStartTime() {
        event.setStartTime(LocalTime.of(9, 0));
        assertEquals(LocalTime.of(9, 0), event.getStartTime());
    }

    @Test
    void setEndTime() {
        event.setEndTime(LocalTime.of(12, 0));
        assertEquals(LocalTime.of(12, 0), event.getEndTime());
    }

    @Test
    void setDdl() {
        event.setDdl(LocalDate.of(2023, 8, 20));
        assertEquals(LocalDate.of(2023, 8, 20), event.getDdl());
    }

    @Test
    void setUid() {
        event.setUid(1002);
        assertEquals(1002, event.getUid());
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
        Event anotherEvent = new Event(
                1,
                "Meeting",
                "Project discussion",
                1,
                "Conference Room",
                2,
                LocalTime.of(10, 0),
                LocalTime.of(11, 0),
                LocalDate.of(2023, 7, 19),
                1001,
                new ArrayList<>(),
                new ArrayList<>()
        );
        assertEquals(event, anotherEvent);

        Event differentEvent = new Event(
                2,
                "Workshop",
                "Technical workshop",
                2,
                "Auditorium",
                1,
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                LocalDate.of(2023, 8, 1),
                1002,
                new ArrayList<>(),
                new ArrayList<>()
        );
        assertNotEquals(event, differentEvent);
    }

    @Test
    void canEqual() {
        Event anotherEvent = new Event();
        assertTrue(event.canEqual(anotherEvent));
    }

    @Test
    void testHashCode() {
        Event anotherEvent = new Event(
                1,
                "Meeting",
                "Project discussion",
                1,
                "Conference Room",
                2,
                LocalTime.of(10, 0),
                LocalTime.of(11, 0),
                LocalDate.of(2023, 7, 19),
                1001,
                new ArrayList<>(),
                new ArrayList<>()
        );
        assertEquals(event.hashCode(), anotherEvent.hashCode());

        Event differentEvent = new Event(
                2,
                "Workshop",
                "Technical workshop",
                2,
                "Auditorium",
                1,
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                LocalDate.of(2023, 8, 1),
                1002,
                new ArrayList<>(),
                new ArrayList<>()
        );
        assertNotEquals(event.hashCode(), differentEvent.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "Event(id=1, title=Meeting, details=Project discussion, category=1, location=Conference Room, priority=2, startTime=10:00, endTime=11:00, ddl=2023-07-19, uid=1001, subtasks=[], reminders=[])";
        assertEquals(expectedString, event.toString());
    }

    @Test
    void testEnumCategoryT() {
        for (Event.categoryT category : Event.categoryT.values()) {
            assertNotNull(category);
        }
    }
}