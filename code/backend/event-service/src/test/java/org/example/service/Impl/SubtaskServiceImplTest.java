package org.example.service.Impl;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.EventRepo;
import org.example.repository.SubtaskRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class SubtaskServiceImplTest {

    @Mock
    private SubtaskRepo subtaskRepo;

    @Mock
    private EventRepo eventRepo;

    @InjectMocks
    private SubtaskServiceImpl subtaskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void changeDone() {
        // Setup data
        Event event = new Event();
        event.setId(1);
        event.setUid(1);

        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setEvent(event);
        subtask.setDone(false);

        // Case: Subtask not found
        when(subtaskRepo.findById(2)).thenReturn(Optional.empty());
        Result<Subtask> notFoundResult = subtaskService.changeDone(2, 1);
        assertEquals(404, notFoundResult.getCode());
        assertEquals("Subtask not found", notFoundResult.getMessage());

        // Case: Permission denied
        event.setUid(2);
        when(subtaskRepo.findById(1)).thenReturn(Optional.of(subtask));
        Result<Subtask> permissionDeniedResult = subtaskService.changeDone(1, 1);
        assertEquals(403, permissionDeniedResult.getCode());
        assertEquals("Permission denied", permissionDeniedResult.getMessage());

        // Case: Success
        event.setUid(1);
        when(subtaskRepo.findById(1)).thenReturn(Optional.of(subtask));
        when(subtaskRepo.save(any(Subtask.class))).thenReturn(subtask);
        Result<Subtask> successResult = subtaskService.changeDone(1, 1);
        assertTrue(successResult.getData().isDone());
    }

    @Test
    void deleteSubtask() {
        // Setup data
        Event event = new Event();
        event.setId(1);
        event.setUid(1);

        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setEvent(event);

        // Case: Subtask not found
        when(subtaskRepo.findById(2)).thenReturn(Optional.empty());
        Result<String> notFoundResult = subtaskService.deleteSubtask(2, 1);
        assertEquals(404, notFoundResult.getCode());
        assertEquals("Subtask not found", notFoundResult.getMessage());

        // Case: Permission denied
        event.setUid(2);
        when(subtaskRepo.findById(1)).thenReturn(Optional.of(subtask));
        Result<String> permissionDeniedResult = subtaskService.deleteSubtask(1, 1);
        assertEquals(403, permissionDeniedResult.getCode());
        assertEquals("Permission denied", permissionDeniedResult.getMessage());

        // Case: Success
        event.setUid(1);
        when(subtaskRepo.findById(1)).thenReturn(Optional.of(subtask));
        Result<String> successResult = subtaskService.deleteSubtask(1, 1);
        assertEquals("Delete success", successResult.getData());
    }

    @Test
    void addSubtask() {
        // Setup data
        Event event = new Event();
        event.setId(1);
        event.setUid(1);

        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setContent("Sample Subtask");
        subtask.setDdl(LocalDate.of(2023, 7, 19));
        subtask.setEvent(event);

        // Case: Event not found
        when(eventRepo.findById(2)).thenReturn(Optional.empty());
        Result<Subtask> notFoundResult = subtaskService.addSubtask(2, "Sample Subtask", LocalDate.of(2023, 7, 19), 1);
        assertEquals(404, notFoundResult.getCode());
        assertEquals("Event not found", notFoundResult.getMessage());

        // Case: Permission denied
        event.setUid(2);
        when(eventRepo.findById(1)).thenReturn(Optional.of(event));
        Result<Subtask> permissionDeniedResult = subtaskService.addSubtask(1, "Sample Subtask", LocalDate.of(2023, 7, 19), 1);
        assertEquals(403, permissionDeniedResult.getCode());
        assertEquals("Permission denied", permissionDeniedResult.getMessage());

        // Case: Success
        event.setUid(1);
        when(eventRepo.findById(1)).thenReturn(Optional.of(event));
        when(subtaskRepo.save(any(Subtask.class))).thenReturn(subtask);
        Result<Subtask> successResult = subtaskService.addSubtask(1, "Sample Subtask", LocalDate.of(2023, 7, 19), 1);
        assertEquals("Sample Subtask", successResult.getData().getContent());
        assertEquals(LocalDate.of(2023, 7, 19), successResult.getData().getDdl());
    }
}
