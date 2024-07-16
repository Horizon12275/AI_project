package org.example.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class SubtaskTest {

    private Subtask subtask;

    @BeforeEach
    void setUp() {
        subtask = new Subtask();
    }

    @Test
    void getId() {
        subtask.setId(1);
        assertEquals(1, subtask.getId());
    }

    @Test
    void getContent() {
        subtask.setContent("Test Content");
        assertEquals("Test Content", subtask.getContent());
    }

    @Test
    void isDone() {
        subtask.setDone(true);
        assertTrue(subtask.isDone());
    }

    @Test
    void getDdl() {
        LocalDateTime now = LocalDateTime.now();
        subtask.setDdl(now);
        assertEquals(now, subtask.getDdl());
    }

    @Test
    void getEvent() {
        Event event = new Event();
        subtask.setEvent(event);
        assertEquals(event, subtask.getEvent());
    }

    @Test
    void setId() {
        subtask.setId(1);
        assertEquals(1, subtask.getId());
    }

    @Test
    void setContent() {
        subtask.setContent("Test Content");
        assertEquals("Test Content", subtask.getContent());
    }

    @Test
    void setDone() {
        subtask.setDone(true);
        assertTrue(subtask.isDone());
    }

    @Test
    void setDdl() {
        LocalDateTime now = LocalDateTime.now();
        subtask.setDdl(now);
        assertEquals(now, subtask.getDdl());
    }

    @Test
    void setEvent() {
        Event event = new Event();
        subtask.setEvent(event);
        assertEquals(event, subtask.getEvent());
    }

    @Test
    void testEquals() {
        Subtask subtask1 = new Subtask(1, "Content", true, LocalDateTime.now(), new Event());
        Subtask subtask2 = new Subtask(1, "Content", true, LocalDateTime.now(), new Event());
        assertEquals(subtask1, subtask2);
    }

    @Test
    void canEqual() {
        Subtask subtask1 = new Subtask();
        Subtask subtask2 = new Subtask();
        assertTrue(subtask1.canEqual(subtask2));
    }

    @Test
    void testHashCode() {
        Subtask subtask1 = new Subtask(1, "Content", true, LocalDateTime.now(), new Event());
        Subtask subtask2 = new Subtask(1, "Content", true, LocalDateTime.now(), new Event());
        assertEquals(subtask1.hashCode(), subtask2.hashCode());
    }

    @Test
    void testToString() {
        LocalDateTime now = LocalDateTime.now();
        Subtask subtask = new Subtask(1, "Content", true, now, new Event());
        String expected = "Subtask(id=1, content=Content, isDone=true, ddl=" + now + ", event=" + subtask.getEvent() + ")";
        assertEquals(expected, subtask.toString());
    }
}
