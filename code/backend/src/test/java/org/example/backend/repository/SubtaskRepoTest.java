package org.example.backend.repository;

import org.example.backend.entity.Event;
import org.example.backend.entity.Subtask;
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

    @Autowired
    private EventRepo eventRepo;

    private Subtask subtask;
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

        subtask = new Subtask();
        subtask.setContent("Test Subtask");
        subtask.setDone(false);
        subtask.setDdl(LocalDateTime.now().plusDays(1));
        subtask.setEvent(event);
    }

    @Test
    void testSaveSubtask() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        assertNotNull(savedSubtask.getId());
        assertEquals("Test Subtask", savedSubtask.getContent());
        assertNotNull(savedSubtask.getEvent());
        assertEquals(event.getId(), savedSubtask.getEvent().getId());
    }

    @Test
    void testFindById() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        Optional<Subtask> foundSubtask = subtaskRepo.findById(savedSubtask.getId());
        assertTrue(foundSubtask.isPresent());
        assertEquals("Test Subtask", foundSubtask.get().getContent());
        assertNotNull(foundSubtask.get().getEvent());
        assertEquals(event.getId(), foundSubtask.get().getEvent().getId());
    }

    @Test
    void testFindAll() {
        subtaskRepo.save(subtask);
        List<Subtask> subtasks = subtaskRepo.findAll();
        assertFalse(subtasks.isEmpty());
        assertNotNull(subtasks.get(0).getEvent());
        assertEquals(event.getId(), subtasks.get(0).getEvent().getId());
    }

    @Test
    void testDelete() {
        Subtask savedSubtask = subtaskRepo.save(subtask);
        subtaskRepo.delete(savedSubtask);
        Optional<Subtask> foundSubtask = subtaskRepo.findById(savedSubtask.getId());
        assertFalse(foundSubtask.isPresent());
    }
}
