package org.example.config;

import org.example.entity.Result;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.lang.reflect.Method;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@Import(SecurityConfig.class)
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    private HttpServletRequest request;
    private HttpServletResponse response;
    private PrintWriter writer;

    @BeforeEach
    void setUp() throws Exception {
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        writer = mock(PrintWriter.class);
        when(response.getWriter()).thenReturn(writer);
    }

    @AfterEach
    void tearDown() {
        request = null;
        response = null;
        writer = null;
    }

    private void invokeHandleProcess(SecurityConfig securityConfig, Object exceptionOrAuthentication) throws Exception {
        Method method = SecurityConfig.class.getDeclaredMethod("handleProcess", HttpServletRequest.class, HttpServletResponse.class, Object.class);
        method.setAccessible(true);
        method.invoke(securityConfig, request, response, exceptionOrAuthentication);
    }

    @Test
    void testAccessDeniedHandler() throws Exception {
        AccessDeniedException exception = new AccessDeniedException("Access Denied");
        SecurityConfig securityConfig = new SecurityConfig();
        invokeHandleProcess(securityConfig, exception);

        verify(response).setContentType("application/json;charset=utf-8");
        verify(writer).write(Result.error(403, "You do not have permission").asJsonString());
    }

    @Test
    void testAuthenticationEntryPointBadCredentials() throws Exception {
        BadCredentialsException exception = new BadCredentialsException("Bad credentials");
        SecurityConfig securityConfig = new SecurityConfig();
        invokeHandleProcess(securityConfig, exception);

        verify(response).setContentType("application/json;charset=utf-8");
        verify(writer).write(Result.error(401, "Username or password error").asJsonString());
    }

    @Test
    void testAuthenticationEntryPointUnauthorized() throws Exception {
        AuthenticationException exception = mock(AuthenticationException.class);
        when(exception.getMessage()).thenReturn("Unauthorized");
        SecurityConfig securityConfig = new SecurityConfig();
        invokeHandleProcess(securityConfig, exception);

        verify(response).setContentType("application/json;charset=utf-8");
        verify(writer).write(Result.error(401, "不允许从服务器外访问此服务！").asJsonString());
    }

    @Test
    void testAuthenticationSuccess() throws Exception {
        Authentication authentication = mock(Authentication.class);
        SecurityConfig securityConfig = new SecurityConfig();
        invokeHandleProcess(securityConfig, authentication);

        verify(response).setContentType("application/json;charset=utf-8");
        verify(writer).write(Result.success(authentication).asJsonString());
    }

    @Test
    void testUnknownError() throws Exception {
        Object unknownObject = new Object();
        SecurityConfig securityConfig = new SecurityConfig();
        invokeHandleProcess(securityConfig, unknownObject);

        verify(response).setContentType("application/json;charset=utf-8");
        verify(writer).write(Result.error(500, "Unknown error").asJsonString());
    }

    @Test
    @WithMockUser
    void testIpAddressAuthorization() throws Exception {
        mockMvc.perform(get("/some-endpoint"))
                .andExpect(status().isOk());
    }
}
