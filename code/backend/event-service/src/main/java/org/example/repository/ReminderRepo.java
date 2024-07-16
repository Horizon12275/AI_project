package org.example.repository;

import org.example.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepo extends JpaRepository<Reminder, Integer>{
}
