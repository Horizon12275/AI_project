package org.example.backend.repository;

import org.example.backend.entity.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtaskRepo extends JpaRepository<Subtask,Integer> {
}
