package org.example.backend.repository;

import org.example.backend.entity.Event;
import org.example.backend.entity.User;
import org.example.backend.entity.User.identityT;
import org.example.backend.entity.User.sleepT;
import org.example.backend.entity.User.challengeT;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class UserRepoTest {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EventRepo eventRepo;

    private User user;
    private Event event;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");
        user.setSleep_schedule(sleepT.eight_to_ten);
        user.setIdentity(identityT.Student);
        user.setChallenge(challengeT.Too_Many_Tasks);

        event = new Event();
        event.setTitle("Test Event");
        event.setDetails("Details of Test Event");
        event.setCategory(Event.categoryT.Work_and_Study);
        event.setLocation("Test Location");
        event.setPriority(1);
        event.setStart(LocalDateTime.now());
        event.setEnd(LocalDateTime.now().plusHours(1));
        event.setUser(user);

        List<Event> events = new ArrayList<>();
        events.add(event);
        user.setEvents(events);
    }

    @Test
    void testSaveUser() {
        User savedUser = userRepo.save(user);
        assertNotNull(savedUser.getId());
        assertEquals("testuser", savedUser.getUsername());

        List<Event> events = savedUser.getEvents();
        assertNotNull(events);
        assertFalse(events.isEmpty());
        assertEquals("Test Event", events.get(0).getTitle());
    }

    @Test
    void testFindById() {
        User savedUser = userRepo.save(user);
        Optional<User> foundUser = userRepo.findById(savedUser.getId());
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());

        List<Event> events = foundUser.get().getEvents();
        assertNotNull(events);
        assertFalse(events.isEmpty());
        assertEquals("Test Event", events.get(0).getTitle());
    }

    @Test
    void testFindUserByUsername() {
        userRepo.save(user);
        User foundUser = userRepo.findUserByUsername("testuser");
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());

        List<Event> events = foundUser.getEvents();
        assertNotNull(events);
        assertFalse(events.isEmpty());
        assertEquals("Test Event", events.get(0).getTitle());
    }

    @Test
    void testFindAll() {
        userRepo.save(user);
        List<User> users = userRepo.findAll();
        assertFalse(users.isEmpty());

        List<Event> events = users.get(0).getEvents();
        assertNotNull(events);
        assertFalse(events.isEmpty());
        assertEquals("Test Event", events.get(0).getTitle());
    }

    @Test
    void testDelete() {
        User savedUser = userRepo.save(user);
        userRepo.delete(savedUser);
        Optional<User> foundUser = userRepo.findById(savedUser.getId());
        assertFalse(foundUser.isPresent());

        List<Event> events = eventRepo.findAll();
        assertTrue(events.isEmpty());
    }
}
