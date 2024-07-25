package org.example.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EventDetailsTest {

    private EventDetails eventDetails;

    @BeforeEach
    void setUp() {
        eventDetails = new EventDetails(
                "Meeting",
                "Work_and_Study",
                "Conference Room",
                "Project discussion",
                "2023-07-19",
                "High"
        );
    }

    @AfterEach
    void tearDown() {
        eventDetails = null;
    }

    @Test
    void getTitle() {
        assertEquals("Meeting", eventDetails.getTitle());
    }

    @Test
    void getCategory() {
        assertEquals("Work_and_Study", eventDetails.getCategory());
    }

    @Test
    void getLocation() {
        assertEquals("Conference Room", eventDetails.getLocation());
    }

    @Test
    void getDetails() {
        assertEquals("Project discussion", eventDetails.getDetails());
    }

    @Test
    void getDdl() {
        assertEquals("2023-07-19", eventDetails.getDdl());
    }

    @Test
    void getPriority() {
        assertEquals("High", eventDetails.getPriority());
    }

    @Test
    void setTitle() {
        eventDetails.setTitle("Workshop");
        assertEquals("Workshop", eventDetails.getTitle());
    }

    @Test
    void setCategory() {
        eventDetails.setCategory("Leisure_and_Recreation");
        assertEquals("Leisure_and_Recreation", eventDetails.getCategory());
    }

    @Test
    void setLocation() {
        eventDetails.setLocation("Auditorium");
        assertEquals("Auditorium", eventDetails.getLocation());
    }

    @Test
    void setDetails() {
        eventDetails.setDetails("Technical workshop");
        assertEquals("Technical workshop", eventDetails.getDetails());
    }

    @Test
    void setDdl() {
        eventDetails.setDdl("2023-08-01");
        assertEquals("2023-08-01", eventDetails.getDdl());
    }

    @Test
    void setPriority() {
        eventDetails.setPriority("Medium");
        assertEquals("Medium", eventDetails.getPriority());
    }

    @Test
    void testEquals() {
        EventDetails anotherEventDetails = new EventDetails(
                "Meeting",
                "Work_and_Study",
                "Conference Room",
                "Project discussion",
                "2023-07-19",
                "High"
        );
        assertEquals(eventDetails, anotherEventDetails);
    }

    @Test
    void canEqual() {
        EventDetails anotherEventDetails = new EventDetails();
        assertTrue(eventDetails.canEqual(anotherEventDetails));
    }

    @Test
    void testHashCode() {
        int expectedHashCode = eventDetails.hashCode();
        assertEquals(expectedHashCode, eventDetails.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "EventDetails(title=Meeting, category=Work_and_Study, location=Conference Room, details=Project discussion, ddl=2023-07-19, priority=High)";
        assertEquals(expectedString, eventDetails.toString());
    }
}
