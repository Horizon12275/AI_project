package org.example.backend.repository;

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

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class UserRepoTest {

    @Autowired
    private UserRepo userRepo;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");
        user.setSleep_schedule(sleepT.eight_to_ten);
        user.setIdentity(identityT.Student);
        user.setChallenge(challengeT.Too_Many_Tasks);
    }

    @Test
    void testSaveUser() {
        User savedUser = userRepo.save(user);
        assertNotNull(savedUser.getId());
        assertEquals("testuser", savedUser.getUsername());
    }

    @Test
    void testFindById() {
        User savedUser = userRepo.save(user);
        Optional<User> foundUser = userRepo.findById(savedUser.getId());
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
    }

    @Test
    void testFindUserByUsername() {
        userRepo.save(user);
        User foundUser = userRepo.findUserByUsername("testuser");
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    void testFindAll() {
        userRepo.save(user);
        List<User> users = userRepo.findAll();
        assertFalse(users.isEmpty());
    }

    @Test
    void testDelete() {
        User savedUser = userRepo.save(user);
        userRepo.delete(savedUser);
        Optional<User> foundUser = userRepo.findById(savedUser.getId());
        assertFalse(foundUser.isPresent());
    }
}
