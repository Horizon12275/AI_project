package org.example.backend.repository;

import org.example.backend.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepo extends JpaRepository<Reminder, Integer>{
}
