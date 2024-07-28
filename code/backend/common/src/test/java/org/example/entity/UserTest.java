package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User(
                1,
                "test@example.com",
                "testuser",
                "password123",
                User.roleT.user,
                2,
                1,
                1,
                3
        );
    }

    @AfterEach
    void tearDown() {
        user = null;
    }

    @Test
    void getId() {
        assertEquals(1, user.getId());
    }

    @Test
    void getEmail() {
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    void getUsername() {
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void getPassword() {
        assertEquals("password123", user.getPassword());
    }

    @Test
    void getRole() {
        assertEquals(User.roleT.user, user.getRole());
    }

    @Test
    void getSleep_schedule() {
        assertEquals(2, user.getSleep_schedule());
    }

    @Test
    void getIdentity() {
        assertEquals(1, user.getIdentity());
    }

    @Test
    void getChallenge() {
        assertEquals(1, user.getChallenge());
    }

    @Test
    void getExercise() {
        assertEquals(3, user.getExercise());
    }

    @Test
    void setId() {
        user.setId(2);
        assertEquals(2, user.getId());
    }

    @Test
    void setEmail() {
        user.setEmail("new@example.com");
        assertEquals("new@example.com", user.getEmail());
    }

    @Test
    void setUsername() {
        user.setUsername("newuser");
        assertEquals("newuser", user.getUsername());
    }

    @Test
    void setPassword() {
        user.setPassword("newpassword");
        assertEquals("newpassword", user.getPassword());
    }

    @Test
    void setRole() {
        user.setRole(User.roleT.admin);
        assertEquals(User.roleT.admin, user.getRole());
    }

    @Test
    void setSleep_schedule() {
        user.setSleep_schedule(3);
        assertEquals(3, user.getSleep_schedule());
    }

    @Test
    void setIdentity() {
        user.setIdentity(2);
        assertEquals(2, user.getIdentity());
    }

    @Test
    void setChallenge() {
        user.setChallenge(2);
        assertEquals(2, user.getChallenge());
    }

    @Test
    void setExercise() {
        user.setExercise(4);
        assertEquals(4, user.getExercise());
    }

    @Test
    void testEquals() {
        User anotherUser = new User(
                1,
                "test@example.com",
                "testuser",
                "password123",
                User.roleT.user,
                2,
                1,
                1,
                3
        );
        assertEquals(user, anotherUser);

        User differentUser = new User(
                2,
                "different@example.com",
                "differentuser",
                "differentpassword",
                User.roleT.admin,
                3,
                2,
                2,
                4
        );
        assertNotEquals(user, differentUser);
    }

    @Test
    void canEqual() {
        User anotherUser = new User();
        assertTrue(user.canEqual(anotherUser));
    }

    @Test
    void testHashCode() {
        User anotherUser = new User(
                1,
                "test@example.com",
                "testuser",
                "password123",
                User.roleT.user,
                2,
                1,
                1,
                3
        );
        assertEquals(user.hashCode(), anotherUser.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "User(id=1, email=test@example.com, username=testuser, password=password123, role=user, sleep_schedule=2, identity=1, challenge=1, exercise=3)";
        assertEquals(expectedString, user.toString());
    }

    @Test
    void testAllEnums() {
        for (User.identityT identity : User.identityT.values()) {
            user.setIdentity(identity.ordinal());
            assertEquals(identity.ordinal(), user.getIdentity());
        }

        for (User.sleepT sleep : User.sleepT.values()) {
            user.setSleep_schedule(sleep.ordinal());
            assertEquals(sleep.ordinal(), user.getSleep_schedule());
        }

        for (User.challengeT challenge : User.challengeT.values()) {
            user.setChallenge(challenge.ordinal());
            assertEquals(challenge.ordinal(), user.getChallenge());
        }
    }
}
