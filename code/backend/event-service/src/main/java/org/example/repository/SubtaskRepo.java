package org.example.repository;


import org.example.entity.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtaskRepo extends JpaRepository<Subtask,Integer> {
}
