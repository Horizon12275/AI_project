package org.example.controller;

import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.service.SubtaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

class SubtaskControllerTest {

    @Mock
    private SubtaskService service;

    @InjectMocks
    private SubtaskController subtaskController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(subtaskController).build();
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void changeStatus() throws Exception {
        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setContent("Test subtask");
        subtask.setDone(true);

        when(service.changeDone(1)).thenReturn(Result.success(subtask));

        mockMvc.perform(put("/api/subtask/changeDone/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", is("Test subtask")))
                .andExpect(jsonPath("$.data.done", is(true)));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void deleteSubtask() throws Exception {
        when(service.deleteSubtask(1)).thenReturn(Result.success("Delete success"));

        mockMvc.perform(delete("/api/subtask/delete/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", is("Delete success")));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void addSubtask() throws Exception {
        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setContent("Test subtask");
        subtask.setDdl(LocalDate.of(2023, 7, 10));

        when(service.addSubtask(any(Integer.class), any(String.class), any(LocalDate.class))).thenReturn(Result.success(subtask));

        mockMvc.perform(post("/api/subtask/add/1")
                        .param("content", "Test subtask")
                        .param("deadline", "2023-07-10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", is("Test subtask")))
                .andExpect(jsonPath("$.data.ddl", is("2023-07-10")));
    }
}
