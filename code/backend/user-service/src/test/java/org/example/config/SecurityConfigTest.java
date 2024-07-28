package org.example.config;

import org.example.entity.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private MockMvc mockMvc;

    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        securityConfig = new SecurityConfig();
    }

    @Test
    void filterChain() throws Exception {
        mockMvc.perform(post("/api/user/register")
                        .contentType("application/json")
                        .content("{\"username\": \"test\", \"email\": \"test@example.com\", \"password\": \"password\"}"))
                .andExpect(status().isOk());

        // 测试需要认证的 URL，未认证时
        mockMvc.perform(get("/api/event/getNums")
                        .param("year", "2023")
                        .param("month", "7"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testHandleProcess_AuthenticationException() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        AuthenticationException authException = new BadCredentialsException("Bad credentials");

        Method handleProcess = SecurityConfig.class.getDeclaredMethod("handleProcess", HttpServletRequest.class, HttpServletResponse.class, Object.class);
        handleProcess.setAccessible(true);

        handleProcess.invoke(securityConfig, request, response, authException);
        verify(response).setContentType("application/json;charset=utf-8");
        verify(response.getWriter()).write(Result.error(401, "Username or password error").asJsonString());
    }

    @Test
    void testHandleProcess_AccessDeniedException() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        AccessDeniedException accessDeniedException = new AccessDeniedException("Access denied");

        Method handleProcess = SecurityConfig.class.getDeclaredMethod("handleProcess", HttpServletRequest.class, HttpServletResponse.class, Object.class);
        handleProcess.setAccessible(true);

        handleProcess.invoke(securityConfig, request, response, accessDeniedException);
        verify(response).setContentType("application/json;charset=utf-8");
        verify(response.getWriter()).write(Result.error(403, "You do not have permission").asJsonString());
    }

    @Test
    void testHandleProcess_Authentication() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Authentication authentication = mock(Authentication.class);

        Method handleProcess = SecurityConfig.class.getDeclaredMethod("handleProcess", HttpServletRequest.class, HttpServletResponse.class, Object.class);
        handleProcess.setAccessible(true);

        handleProcess.invoke(securityConfig, request, response, authentication);
        verify(response).setContentType("application/json;charset=utf-8");
        verify(response.getWriter()).write(Result.success(authentication).asJsonString());
    }

    @Test
    void testHandleProcess_Other() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Object otherException = new Object();

        Method handleProcess = SecurityConfig.class.getDeclaredMethod("handleProcess", HttpServletRequest.class, HttpServletResponse.class, Object.class);
        handleProcess.setAccessible(true);

        handleProcess.invoke(securityConfig, request, response, otherException);
        verify(response).setContentType("application/json;charset=utf-8");
        verify(response.getWriter()).write(Result.error(500, "Unknown error").asJsonString());
    }

    @Test
    void passwordEncoder() {
        SecurityConfig securityConfig = new SecurityConfig();
        assertNotNull(securityConfig.passwordEncoder());
    }
}
