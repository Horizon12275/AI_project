package org.example.controller;

import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.service.SubtaskService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SubtaskController.class)
class SubtaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubtaskService subtaskService;

    @BeforeEach
    void setUp() {
    }

    @Test
    @WithMockUser
    void changeStatus() throws Exception {
        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setContent("Sample Subtask");
        subtask.setDone(true);

        when(subtaskService.changeDone(1, 1)).thenReturn(Result.success(subtask));

        mockMvc.perform(put("/api/subtask/changeDone/1")
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.content").value("Sample Subtask"))
                .andExpect(jsonPath("$.data.done").value(true));
    }

    @Test
    @WithMockUser
    void deleteSubtask() throws Exception {
        when(subtaskService.deleteSubtask(1, 1)).thenReturn(Result.success("Subtask deleted"));

        mockMvc.perform(delete("/api/subtask/delete/1")
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("Subtask deleted"));
    }

    @Test
    @WithMockUser
    void addSubtask() throws Exception {
        Subtask subtask = new Subtask();
        subtask.setId(1);
        subtask.setContent("New Subtask");
        subtask.setDdl(LocalDate.of(2023, 7, 19));
        subtask.setDone(false);

        when(subtaskService.addSubtask(eq(1), eq("New Subtask"), eq(LocalDate.of(2023, 7, 19)), eq(1)))
                .thenReturn(Result.success(subtask));

        mockMvc.perform(post("/api/subtask/add/1")
                        .param("content", "New Subtask")
                        .param("deadline", "2023-07-19")
                        .param("uid", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.content").value("New Subtask"))
                .andExpect(jsonPath("$.data.ddl").value("2023-07-19"))
                .andExpect(jsonPath("$.data.done").value(false));
    }
}
