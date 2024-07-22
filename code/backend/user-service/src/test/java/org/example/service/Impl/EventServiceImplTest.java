package org.example.service.Impl;

import org.example.client.AIClient;
import org.example.client.EventClient;
import org.example.constant.ConstMaps;
import org.example.entity.*;
import org.example.repository.UserRepo;
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

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class EventServiceImplTest {

    @Mock
    private EventClient eventClient;

    @Mock
    private AIClient aiClient;

    @Mock
    private UserRepo userRepo;

    @Mock
    private ConstMaps constMaps;

    @InjectMocks
    private EventServiceImpl eventService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // 设置SecurityContext
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("test@example.com");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);

        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");
        when(userRepo.findUserByEmail(anyString())).thenReturn(user);
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getUid() {
        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(user);

        int uid = eventService.getUid();
        assertEquals(1, uid);
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getNumsByMonth() {
        int[] nums = {0, 2, 3, 0, 1};
        when(eventClient.getNums(2023, 7, 1)).thenReturn(Result.success(nums));

        Result<int[]> result = eventService.getNumsByMonth(2023, 7);
        assertEquals(nums, result.getData());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getEventsByDate() {
        LocalDate date = LocalDate.of(2023, 7, 10);
        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");

        when(eventClient.getEvents(date, 1)).thenReturn(Result.success(Arrays.asList(event)));

        Result<List<Event>> result = eventService.getEventsByDate(date);
        assertEquals(1, result.getData().size());
        assertEquals("Sample Event", result.getData().get(0).getTitle());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void addEventOnline() {
        User user = new User();
        user.setId(1);
        user.setIdentity(1);
        user.setSleep_schedule(1);
        user.setChallenge(1);

        Event event = new Event();
        event.setId(1);
        event.setTitle("Sample Event");

        EventDetails eventDetails = new EventDetails();
        eventDetails.setTitle("Sample Event");

        UserPortrait userPortrait = new UserPortrait("identity", "sleep_schedule", "challenge");

        String[] reminderContents = {"Reminder 1", "Reminder 2"};
        String[] subtaskContents = {"Subtask 1", "Subtask 2"};

        when(userRepo.findById(1)).thenReturn(Optional.of(user));
        when(constMaps.getIdentityMap()).thenReturn(Map.of(1, "identity"));
        when(constMaps.getSleepScheduleMap()).thenReturn(Map.of(1, "sleep_schedule"));
        when(constMaps.getChallengeMap()).thenReturn(Map.of(1, "challenge"));

        when(aiClient.generateReminders(eventDetails)).thenReturn(reminderContents);
        when(aiClient.generateSubtasks(eventDetails)).thenReturn(subtaskContents);

        when(eventClient.addEvent(any(Event.class), any(Integer.class))).thenReturn(Result.success(event));

        Result<Event> result = eventService.addEventOnline(event, eventDetails);
        assertEquals("Sample Event", result.getData().getTitle());
        assertEquals(2, result.getData().getReminders().size());
        assertEquals("Reminder 1", result.getData().getReminders().get(0).getContent());
        assertEquals(2, result.getData().getSubtasks().size());
        assertEquals("Subtask 1", result.getData().getSubtasks().get(0).getContent());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void summary() {
        LocalDate start = LocalDate.of(2023, 7, 1);
        LocalDate end = LocalDate.of(2023, 7, 31);

        List<Object> summaryData = Arrays.asList(new Object(), new Object());

        when(eventClient.summary(start, end, 1)).thenReturn(Result.success(summaryData));

        Result<List<Object>> result = eventService.summary(start, end);
        assertEquals(2, result.getData().size());
    }
}
