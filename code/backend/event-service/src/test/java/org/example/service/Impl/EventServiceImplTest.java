package org.example.service.Impl;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.EventRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class EventServiceImplTest {

    @Mock
    private EventRepo eventRepo;

    @InjectMocks
    private EventServiceImpl eventService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getNumsByMonth() {
        LocalDate start = LocalDate.of(2023, 7, 1);
        LocalDate end = start.plusMonths(1);
        Event event1 = new Event();
        event1.setDdl(LocalDate.of(2023, 7, 10));
        event1.setUid(1);

        Event event2 = new Event();
        event2.setDdl(LocalDate.of(2023, 7, 15));
        event2.setUid(1);

        when(eventRepo.getEventsByDdlBetweenAndUid(start, end, 1)).thenReturn(Arrays.asList(event1, event2));

        int[] nums = eventService.getNumsByMonth(2023, 7, 1);
        assertEquals(1, nums[9]); // Event on 10th July
        assertEquals(1, nums[14]); // Event on 15th July
    }

    @Test
    void getEventsByDate() {
        LocalDate date = LocalDate.of(2023, 7, 10);
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");
        event.setUid(1);

        when(eventRepo.getEventsByDdlAndUid(date, 1)).thenReturn(Arrays.asList(event));

        List<Event> events = eventService.getEventsByDate(date, 1);
        assertEquals(1, events.size());
        assertEquals("Sample Event", events.get(0).getTitle());
    }

    @Test
    void addEvent() {
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");
        event.setUid(1);

        Subtask subtask1 = new Subtask();
        subtask1.setId(1);
        subtask1.setContent("Sample Subtask 1");
        subtask1.setEvent(event);

        Subtask subtask2 = new Subtask();
        subtask2.setId(2);
        subtask2.setContent("Sample Subtask 2");

        event.setSubtasks(Arrays.asList(subtask1, subtask2));

        when(eventRepo.save(any(Event.class))).thenReturn(event);

        Result<Event> result = eventService.addEvent(event, 1);
        assertEquals("Sample Event", result.getData().getTitle());
        assertEquals(1, result.getData().getSubtasks().get(0).getId());
        assertEquals("Sample Subtask 1", result.getData().getSubtasks().get(0).getContent());
        assertEquals(2, result.getData().getSubtasks().get(1).getId());
        assertEquals("Sample Subtask 2", result.getData().getSubtasks().get(1).getContent());
        assertEquals(event, result.getData().getSubtasks().get(1).getEvent());
    }

    @Test
    void summary() {
        LocalDate start = LocalDate.of(2023, 7, 1);
        LocalDate end = LocalDate.of(2023, 7, 31);

        Event event1 = new Event();
        event1.setStartTime(LocalTime.of(9, 0));
        event1.setEndTime(LocalTime.of(10, 0));
        event1.setCategory(1);
        event1.setUid(1);

        Event event2 = new Event();
        event2.setStartTime(LocalTime.of(10, 0));
        event2.setEndTime(LocalTime.of(11, 0));
        event2.setCategory(2);
        event2.setUid(1);

        Event event3 = new Event();
        event3.setStartTime(null);
        event3.setEndTime(null);
        event3.setCategory(3);
        event3.setUid(1);

        when(eventRepo.getEventsByDdlBetweenAndUid(start, end, 1)).thenReturn(Arrays.asList(event1, event2, event3));

        Result<List<Object>> result = eventService.summary(start, end, 1);

        assertEquals(2, result.getData().size());
        assertEquals(50.0, ((Map<String, Object>) result.getData().get(0)).get("percentage"));
        assertEquals(50.0, ((Map<String, Object>) result.getData().get(1)).get("percentage"));
    }
}
