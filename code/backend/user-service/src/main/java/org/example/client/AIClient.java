package org.example.client;

import org.example.entity.EventDetails;
import org.example.entity.UserPortrait;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "http://localhost:8000", name = "ai-service")
public interface AIClient {
    @PostMapping("/generate_reminders")
    String[] generateReminders(@RequestBody EventDetails eventDetails);
    @PostMapping("/generate_subtasks")
    String[] generateSubtasks(@RequestBody EventDetails eventDetails);
    @PostMapping("/set_user_details")
    String setUserDetails(@RequestBody UserPortrait userPortrait);
}
