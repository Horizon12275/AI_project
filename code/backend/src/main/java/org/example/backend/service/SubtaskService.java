package org.example.backend.service;

import org.example.backend.entity.Result;
import org.example.backend.entity.Subtask;

import java.time.LocalDate;

public interface SubtaskService {

    Result<Subtask> changeDone(int id);

    Result<String> deleteSubtask(int id);

    Result<Subtask> addSubtask(int eid, String content, LocalDate deadline);
}
