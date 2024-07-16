package org.example.backend.service.Impl;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");
    }

    @AfterEach
    void tearDown() {
        user = null;
    }

    @Test
    void addUser() {
        when(userRepo.save(any(User.class))).thenReturn(user);

        Result<User> result = userService.addUser(user);

        assertNotNull(result);
        assertEquals(200, result.getCode());
        assertEquals("testuser", result.getData().getUsername());
        verify(userRepo, times(1)).save(user);
    }

    @Test
    void getUserByUsername() throws ExecutionException, InterruptedException {
        when(userRepo.findUserByUsername("testuser")).thenReturn(user);

        Result<User> result = userService.getUserByUsername("testuser");

        assertNotNull(result);
        assertEquals(200, result.getCode());
        assertEquals("testuser", result.getData().getUsername());
        verify(userRepo, times(1)).findUserByUsername("testuser");
    }

    @Test
    void getUserByUsernameNotFound() throws ExecutionException, InterruptedException {
        when(userRepo.findUserByUsername("unknown")).thenReturn(null);

        Result<User> result = userService.getUserByUsername("unknown");

        assertNotNull(result);
        assertEquals(404, result.getCode());
        assertEquals("User not found", result.getMessage());
        verify(userRepo, times(1)).findUserByUsername("unknown");
    }

    @Test
    void getUserByDocId() throws ExecutionException, InterruptedException {
        Result<User> result = userService.getUserByDocId("12345");

        assertNotNull(result);
        assertEquals(404, result.getCode());
        assertEquals("User not found", result.getMessage());
    }
}
