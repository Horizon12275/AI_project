package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class SubtaskTest {

    private Subtask subtask;
    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
        subtask = new Subtask(1, "Complete assignment", false, LocalDate.of(2023, 7, 19), event);
    }

    @AfterEach
    void tearDown() {
        subtask = null;
        event = null;
    }

    @Test
    void testNoArgsConstructor() {
        Subtask emptySubtask = new Subtask();
        assertNotNull(emptySubtask);
    }

    @Test
    void testAllArgsConstructor() {
        Subtask fullSubtask = new Subtask(2, "Review code", true, LocalDate.of(2023, 8, 1), event);
        assertNotNull(fullSubtask);
        assertEquals(2, fullSubtask.getId());
        assertEquals("Review code", fullSubtask.getContent());
        assertTrue(fullSubtask.isDone());
        assertEquals(LocalDate.of(2023, 8, 1), fullSubtask.getDdl());
        assertEquals(event, fullSubtask.getEvent());
    }

    @Test
    void getId() {
        assertEquals(1, subtask.getId());
    }

    @Test
    void getContent() {
        assertEquals("Complete assignment", subtask.getContent());
    }

    @Test
    void isDone() {
        assertFalse(subtask.isDone());
    }

    @Test
    void getDdl() {
        assertEquals(LocalDate.of(2023, 7, 19), subtask.getDdl());
    }

    @Test
    void getEvent() {
        assertEquals(event, subtask.getEvent());
    }

    @Test
    void setId() {
        subtask.setId(2);
        assertEquals(2, subtask.getId());
    }

    @Test
    void setContent() {
        subtask.setContent("Review code");
        assertEquals("Review code", subtask.getContent());
    }

    @Test
    void setDone() {
        subtask.setDone(true);
        assertTrue(subtask.isDone());
    }

    @Test
    void setDdl() {
        subtask.setDdl(LocalDate.of(2023, 8, 1));
        assertEquals(LocalDate.of(2023, 8, 1), subtask.getDdl());
    }

    @Test
    void setEvent() {
        Event newEvent = new Event();
        subtask.setEvent(newEvent);
        assertEquals(newEvent, subtask.getEvent());
    }

    @Test
    void testEquals() {
        Subtask anotherSubtask = new Subtask(1, "Complete assignment", false, LocalDate.of(2023, 7, 19), event);
        assertEquals(subtask, anotherSubtask);

        Subtask differentSubtask = new Subtask(2, "Review code", true, LocalDate.of(2023, 8, 1), new Event());
        assertNotEquals(subtask, differentSubtask);
    }

    @Test
    void canEqual() {
        Subtask anotherSubtask = new Subtask(1, "Complete assignment", false, LocalDate.of(2023, 7, 19), event);
        assertTrue(subtask.canEqual(anotherSubtask));
    }

    @Test
    void testHashCode() {
        Subtask anotherSubtask = new Subtask(1, "Complete assignment", false, LocalDate.of(2023, 7, 19), event);
        assertEquals(subtask.hashCode(), anotherSubtask.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "Subtask(id=1, content=Complete assignment, isDone=false, ddl=2023-07-19, event=" + event.toString() + ")";
        assertEquals(expectedString, subtask.toString());
    }
}
