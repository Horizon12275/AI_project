package org.example.client;

import org.example.entity.Event;
import org.example.entity.EventDetails;
import org.example.entity.Subtask;
import org.example.entity.UserPortrait;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "AI-service")
public interface AIClient {
    @PostMapping("/generate_reminders")
    String[] generateReminders(@RequestBody EventDetails eventDetails);
    @PostMapping("/generate_subtasks")
    List<Subtask> generateSubtasks(@RequestBody EventDetails eventDetails);
    @PostMapping("/generate_priority")
    Integer generatePriority(@RequestBody EventDetails eventDetails);
    @PostMapping("/generate_priority")
    String generateSummary(@RequestBody List<EventDetails> eventDetails);
    @PostMapping("/set_user_details")
    String setUserDetails(@RequestBody UserPortrait userPortrait);
}
