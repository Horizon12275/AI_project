package org.example.controller;

import org.example.entity.Event;
import org.example.entity.Result;
import org.example.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    @BeforeEach
    void setUp() {
    }

    @Test
    @WithMockUser
    void getNums() throws Exception {
        int[] nums = {0, 2, 3, 0, 1};
        when(eventService.getNumsByMonth(2023, 7, 1)).thenReturn(nums);

        mockMvc.perform(get("/api/event/getNums")
                        .param("year", "2023")
                        .param("month", "7")
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[1]").value(2))
                .andExpect(jsonPath("$.data[2]").value(3));
    }

    @Test
    @WithMockUser
    void getEvents() throws Exception {
        LocalDate date = LocalDate.of(2023, 7, 19);
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");
        List<Event> events = Collections.singletonList(event);

        when(eventService.getEventsByDate(date, 1)).thenReturn(events);

        mockMvc.perform(get("/api/event/getEvents")
                        .param("date", date.toString())
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].title").value("Sample Event"));
    }

    @Test
    @WithMockUser
    void addEvent() throws Exception {
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");

        when(eventService.addEvent(any(Event.class), eq(1))).thenReturn(Result.success(event));

        mockMvc.perform(post("/api/event/add")
                        .param("uid", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Sample Event\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("Sample Event"));
    }

    @Test
    @WithMockUser
    void summary() throws Exception {
        LocalDate start = LocalDate.of(2023, 7, 1);
        LocalDate end = LocalDate.of(2023, 7, 31);
        List<Object> summaryData = Arrays.asList(new Object(), new Object());

        when(eventService.summary(start, end, 1)).thenReturn(Result.success(summaryData));

        mockMvc.perform(get("/api/event/summary")
                        .param("start", start.toString())
                        .param("end", end.toString())
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }
}
