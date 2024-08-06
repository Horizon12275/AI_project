package org.example.controller;

import org.example.entity.RegisterRequest;
import org.example.entity.Result;
import org.example.entity.User;
import org.example.service.Impl.MyUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

class UserControllerTest {

    @Mock
    private MyUserDetailsService service;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void testGet() throws Exception {
        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        when(service.getUserByEmail("test@example.com")).thenReturn(Result.success(user));

        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("test@example.com");
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(get("/api/user/get"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email", is("test@example.com")));
    }

    @Test
    void register() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setUsername("testuser");
        request.setPassword("password");

        User user = new User();
        user.setEmail("test@example.com");
        user.setUsername("testuser");

        when(service.register(any(RegisterRequest.class))).thenReturn(Result.success(user));

        mockMvc.perform(post("/api/user/register")
                        .contentType("application/json")
                        .content("{ \"email\": \"test@example.com\", \"username\": \"testuser\", \"password\": \"password\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email", is("test@example.com")))
                .andExpect(jsonPath("$.data.username", is("testuser")));
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void portrait() throws Exception {
        User user = new User();
        user.setChallenge(1);
        user.setSleep_schedule(2);
        user.setIdentity(3);
        user.setExercise(4);
        user.setEmail("test@example.com");

        User updatedUser = new User();
        updatedUser.setChallenge(1);
        updatedUser.setSleep_schedule(2);
        updatedUser.setIdentity(3);
        updatedUser.setExercise(4);
        updatedUser.setEmail("test@example.com");

        when(service.updateUser(any(User.class))).thenReturn(Result.success(updatedUser));

        mockMvc.perform(post("/api/user/portrait")
                        .contentType("application/json")
                        .content("{ \"challenge\": 1, \"sleep_schedule\": 2, \"identity\": 3, \"exercise\": 4 }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.challenge", is(1)))
                .andExpect(jsonPath("$.data.sleep_schedule", is(2)))
                .andExpect(jsonPath("$.data.identity", is(3)))
                .andExpect(jsonPath("$.data.exercise", is(4)))
                .andExpect(jsonPath("$.data.email", is("test@example.com")));
    }
}
