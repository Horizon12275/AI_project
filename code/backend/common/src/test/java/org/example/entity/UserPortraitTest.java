package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserPortraitTest {

    private UserPortrait userPortrait;

    @BeforeEach
    void setUp() {
        userPortrait = new UserPortrait(
                "Student",
                "six_to_eight",
                "Too_Many_Tasks"
        );
    }

    @AfterEach
    void tearDown() {
        userPortrait = null;
    }

    @Test
    void testNoArgsConstructor() {
        UserPortrait emptyUserPortrait = new UserPortrait();
        assertNotNull(emptyUserPortrait);
    }

    @Test
    void testAllArgsConstructor() {
        UserPortrait fullUserPortrait = new UserPortrait(
                "Freelancer",
                "eight_to_ten",
                "Inability_to_Concentrate"
        );
        assertNotNull(fullUserPortrait);
        assertEquals("Freelancer", fullUserPortrait.getIdentity());
        assertEquals("eight_to_ten", fullUserPortrait.getSleep_schedule());
        assertEquals("Inability_to_Concentrate", fullUserPortrait.getChallenge());
    }

    @Test
    void getIdentity() {
        assertEquals("Student", userPortrait.getIdentity());
    }

    @Test
    void getSleep_schedule() {
        assertEquals("six_to_eight", userPortrait.getSleep_schedule());
    }

    @Test
    void getChallenge() {
        assertEquals("Too_Many_Tasks", userPortrait.getChallenge());
    }

    @Test
    void setIdentity() {
        userPortrait.setIdentity("Office_Worker");
        assertEquals("Office_Worker", userPortrait.getIdentity());
    }

    @Test
    void setSleep_schedule() {
        userPortrait.setSleep_schedule("more_than_ten");
        assertEquals("more_than_ten", userPortrait.getSleep_schedule());
    }

    @Test
    void setChallenge() {
        userPortrait.setChallenge("Lack_of_Prioritization");
        assertEquals("Lack_of_Prioritization", userPortrait.getChallenge());
    }

    @Test
    void testEquals() {
        UserPortrait anotherUserPortrait = new UserPortrait(
                "Student",
                "six_to_eight",
                "Too_Many_Tasks"
        );
        assertEquals(userPortrait, anotherUserPortrait);

        UserPortrait differentUserPortrait = new UserPortrait(
                "Freelancer",
                "eight_to_ten",
                "Inability_to_Concentrate"
        );
        assertNotEquals(userPortrait, differentUserPortrait);
    }

    @Test
    void canEqual() {
        UserPortrait anotherUserPortrait = new UserPortrait();
        assertTrue(userPortrait.canEqual(anotherUserPortrait));
    }

    @Test
    void testHashCode() {
        UserPortrait anotherUserPortrait = new UserPortrait(
                "Student",
                "six_to_eight",
                "Too_Many_Tasks"
        );
        assertEquals(userPortrait.hashCode(), anotherUserPortrait.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "UserPortrait(identity=Student, sleep_schedule=six_to_eight, challenge=Too_Many_Tasks)";
        assertEquals(expectedString, userPortrait.toString());
    }
}
