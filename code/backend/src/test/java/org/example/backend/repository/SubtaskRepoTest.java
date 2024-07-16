package org.example.backend.repository;

import org.example.backend.entity.Subtask;
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
class SubtaskRepoTest {

    @Autowired
    private SubtaskRepo subtaskRepo;

    private Subtask subtask;
    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event();
        event.setId(1);
        event.setTitle("Test Event");

        subtask = new Subtask();
        subtask.setContent("Test Subtask");
        subtask.setDone(false);
        subtask.setDdl(LocalDateTime.now());
        subtask.setEvent(event);
    }

    @Test
    void testSaveSubtask() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        assertNotNull(savedSubtask.getId());
        assertEquals("Test Subtask", savedSubtask.getContent());
    }

    @Test
    void testFindById() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        Optional<Subtask> foundSubtask = subtaskRepo.findById(savedSubtask.getId());
        assertTrue(foundSubtask.isPresent());
        assertEquals("Test Subtask", foundSubtask.get().getContent());
    }

    @Test
    void testFindAll() {
        subtaskRepo.save(subtask);
        List<Subtask> subtasks = subtaskRepo.findAll();
        assertFalse(subtasks.isEmpty());
    }

    @Test
    void testDelete() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        subtaskRepo.delete(savedSubtask);
        Optional<Subtask> foundSubtask = subtaskRepo.findById(savedSubtask.getId());
        assertFalse(foundSubtask.isPresent());
    }
}
