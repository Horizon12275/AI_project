package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("user1", "user1@example.com", "password123");
    }

    @AfterEach
    void tearDown() {
        registerRequest = null;
    }

    @Test
    void getUsername() {
        assertEquals("user1", registerRequest.getUsername());
    }

    @Test
    void getEmail() {
        assertEquals("user1@example.com", registerRequest.getEmail());
    }

    @Test
    void getPassword() {
        assertEquals("password123", registerRequest.getPassword());
    }

    @Test
    void setUsername() {
        registerRequest.setUsername("newUser");
        assertEquals("newUser", registerRequest.getUsername());
    }

    @Test
    void setEmail() {
        registerRequest.setEmail("newUser@example.com");
        assertEquals("newUser@example.com", registerRequest.getEmail());
    }

    @Test
    void setPassword() {
        registerRequest.setPassword("newPassword");
        assertEquals("newPassword", registerRequest.getPassword());
    }

    @Test
    void testEquals() {
        RegisterRequest anotherRequest = new RegisterRequest("user1", "user1@example.com", "password123");
        assertEquals(registerRequest, anotherRequest);
    }

    @Test
    void canEqual() {
        RegisterRequest anotherRequest = new RegisterRequest();
        assertTrue(registerRequest.canEqual(anotherRequest));
    }

    @Test
    void testHashCode() {
        int expectedHashCode = registerRequest.hashCode();
        assertEquals(expectedHashCode, registerRequest.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "RegisterRequest(username=user1, email=user1@example.com, password=password123)";
        assertEquals(expectedString, registerRequest.toString());
    }
}
