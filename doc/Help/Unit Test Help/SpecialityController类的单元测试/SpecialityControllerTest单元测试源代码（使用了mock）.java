package org.example.backend.controller;

import org.example.backend.entity.Result;
import org.example.backend.entity.Speciality;
import org.example.backend.service.SpecialityService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
class SpecialityControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private SpecialityService specialityService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @AfterEach
    void tearDown() {
        reset(specialityService);
    }

    @Test
    void listWhenEmpty() throws Exception {
        when(specialityService.getSpecialities()).thenReturn(Result.success(Collections.emptyList()));

        mockMvc.perform(get("/api/speciality/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(specialityService, times(1)).getSpecialities();
    }

    @Test
    void listWhenNotEmpty() throws Exception {
        List<Speciality> specialities = Arrays.asList(new Speciality(), new Speciality());
        when(specialityService.getSpecialities()).thenReturn(Result.success(specialities));

        mockMvc.perform(get("/api/speciality/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(2)));

        verify(specialityService, times(1)).getSpecialities();
    }


    @Test
    void listWhenException() throws Exception {
        when(specialityService.getSpecialities()).thenThrow(new RuntimeException("Test exception"));

        mockMvc.perform(get("/api/speciality/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(500)))
                .andExpect(jsonPath("$.message", is("Test exception")));

        verify(specialityService, times(1)).getSpecialities();
    }
}