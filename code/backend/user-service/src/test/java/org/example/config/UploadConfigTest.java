package org.example.config;

import jakarta.servlet.ServletContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UploadConfigTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        ServletContext servletContext = webApplicationContext.getServletContext();
        assertThat(servletContext).isNotNull();
        assertThat(servletContext instanceof MockServletContext).isTrue();
        assertThat(webApplicationContext.getBean("uploadConfig")).isNotNull();
    }

    @Test
    void testImageResourceHandler() throws Exception {
        mockMvc.perform(get("/image/test.jpg"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDocumentResourceHandler() throws Exception {
        mockMvc.perform(get("/document/test.pdf"))
                .andExpect(status().isNotFound());
    }
}
