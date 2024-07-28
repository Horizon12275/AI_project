package org.example.controller;

import com.alibaba.fastjson2.JSONObject;
import org.example.entity.Event;
import org.example.entity.EventDetails;
import org.example.entity.Result;
import org.example.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

class EventControllerTest {

    @Mock
    private EventService service;

    @InjectMocks
    private EventController eventController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(eventController).build();
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getNums() throws Exception {
        int[] nums = {1, 2, 3, 4, 5};

        when(service.getNumsByMonth(2023, 7)).thenReturn(Result.success(nums));

        mockMvc.perform(get("/api/event/getNums")
                        .param("year", "2023")
                        .param("month", "7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0]", is(1)))
                .andExpect(jsonPath("$.data[1]", is(2)));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getEvents() throws Exception {
        List<Event> events = new ArrayList<>();
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");
        events.add(event);

        when(service.getEventsByDate(LocalDate.of(2023, 7, 10))).thenReturn(Result.success(events));

        mockMvc.perform(get("/api/event/getEvents")
                        .param("date", "2023-07-10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title", is("Sample Event")));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void addEventOnline() throws Exception {
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");

        EventDetails eventDetails = new EventDetails();
        eventDetails.setTitle("Sample Event");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("event", event);
        jsonObject.put("eventDetails", eventDetails);

        when(service.addEventOnline(any(Event.class), any(EventDetails.class))).thenReturn(Result.success(event));

        mockMvc.perform(post("/api/event/add_online")
                        .contentType("application/json")
                        .content(jsonObject.toJSONString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title", is("Sample Event")));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void addEventOffline() throws Exception {
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");

        mockMvc.perform(post("/api/event/add_offline")
                        .contentType("application/json")
                        .content("{ \"id\": 1, \"title\": \"Sample Event\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", is((Object) null))); // assuming this returns null
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void summary() throws Exception {
        List<Object> summaryData = new ArrayList<>();
        summaryData.add(new Object());

        when(service.summary(LocalDate.of(2023, 7, 1), LocalDate.of(2023, 7, 31))).thenReturn(Result.success(summaryData));

        mockMvc.perform(get("/api/event/summary")
                        .param("start", "2023-07-01")
                        .param("end", "2023-07-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()", is(1)));
    }
}
