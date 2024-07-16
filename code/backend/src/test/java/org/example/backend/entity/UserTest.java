package org.example.backend.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void getId() {
        user.setId(1);
        assertEquals(1, user.getId());
    }

    @Test
    void getUsername() {
        user.setUsername("testuser");
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void getPassword() {
        user.setPassword("password123");
        assertEquals("password123", user.getPassword());
    }

    @Test
    void getSleep_schedule() {
        user.setSleep_schedule(User.sleepT.eight_to_ten);
        assertEquals(User.sleepT.eight_to_ten, user.getSleep_schedule());
    }

    @Test
    void getIdentity() {
        user.setIdentity(User.identityT.Student);
        assertEquals(User.identityT.Student, user.getIdentity());
    }

    @Test
    void getChallenge() {
        user.setChallenge(User.challengeT.Too_Many_Tasks);
        assertEquals(User.challengeT.Too_Many_Tasks, user.getChallenge());
    }

    @Test
    void getEvents() {
        List<Event> events = new ArrayList<>();
        user.setEvents(events);
        assertEquals(events, user.getEvents());
    }

    @Test
    void setId() {
        user.setId(1);
        assertEquals(1, user.getId());
    }

    @Test
    void setUsername() {
        user.setUsername("testuser");
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void setPassword() {
        user.setPassword("password123");
        assertEquals("password123", user.getPassword());
    }

    @Test
    void setSleep_schedule() {
        user.setSleep_schedule(User.sleepT.eight_to_ten);
        assertEquals(User.sleepT.eight_to_ten, user.getSleep_schedule());
    }

    @Test
    void setIdentity() {
        user.setIdentity(User.identityT.Student);
        assertEquals(User.identityT.Student, user.getIdentity());
    }

    @Test
    void setChallenge() {
        user.setChallenge(User.challengeT.Too_Many_Tasks);
        assertEquals(User.challengeT.Too_Many_Tasks, user.getChallenge());
    }

    @Test
    void setEvents() {
        List<Event> events = new ArrayList<>();
        user.setEvents(events);
        assertEquals(events, user.getEvents());
    }

    @Test
    void testEquals() {
        User user1 = new User(1, "testuser", "password123", User.sleepT.eight_to_ten, User.identityT.Student, User.challengeT.Too_Many_Tasks, new ArrayList<>());
        User user2 = new User(1, "testuser", "password123", User.sleepT.eight_to_ten, User.identityT.Student, User.challengeT.Too_Many_Tasks, new ArrayList<>());
        assertEquals(user1, user2);
    }

    @Test
    void canEqual() {
        User user1 = new User();
        User user2 = new User();
        assertTrue(user1.canEqual(user2));
    }

    @Test
    void testHashCode() {
        User user1 = new User(1, "testuser", "password123", User.sleepT.eight_to_ten, User.identityT.Student, User.challengeT.Too_Many_Tasks, new ArrayList<>());
        User user2 = new User(1, "testuser", "password123", User.sleepT.eight_to_ten, User.identityT.Student, User.challengeT.Too_Many_Tasks, new ArrayList<>());
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testToString() {
        User user = new User(1, "testuser", "password123", User.sleepT.eight_to_ten, User.identityT.Student, User.challengeT.Too_Many_Tasks, new ArrayList<>());
        String expected = "User(id=1, username=testuser, password=password123, sleep_schedule=eight_to_ten, identity=Student, challenge=Too_Many_Tasks, events=[])";
        assertEquals(expected, user.toString());
    }
}
