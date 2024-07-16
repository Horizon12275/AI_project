package org.example.backend.controller;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    void addUser() {
        User user = new User();
        Result<User> expectedResult = Result.success(user);

        when(userService.addUser(any(User.class))).thenReturn(expectedResult);

        Result<User> result = userController.addUser(user);

        assertNotNull(result);
        assertEquals(expectedResult.getCode(), result.getCode());
        assertEquals(expectedResult.getMessage(), result.getMessage());
        assertEquals(expectedResult.getData(), result.getData());
    }

    @Test
    void getUserByUsername() throws ExecutionException, InterruptedException {
        String username = "testUser";
        User user = new User();
        user.setUsername(username);
        Result<User> expectedResult = Result.success(user);

        when(userService.getUserByUsername(eq(username))).thenReturn(expectedResult);

        Result<User> result = userController.getUserByUsername(username);

        assertNotNull(result);
        assertEquals(expectedResult.getCode(), result.getCode());
        assertEquals(expectedResult.getMessage(), result.getMessage());
        assertEquals(expectedResult.getData(), result.getData());
    }

    @Test
    void test1() {
        ResponseEntity<String> response = userController.test();
        assertNotNull(response);
        assertEquals(ResponseEntity.ok("test"), response);
    }
}
