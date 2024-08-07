package org.example.client;

import org.example.entity.EventDetails;
import org.example.entity.Subtask;
import org.example.entity.UserPortrait;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "ai-service")
public interface AIClient {
    @PostMapping("/generate_summary")
    String generateSummary(@RequestBody List<EventDetails> eventDetails);

}
