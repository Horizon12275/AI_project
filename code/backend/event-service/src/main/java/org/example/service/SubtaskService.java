package org.example.service;



import org.example.entity.Result;
import org.example.entity.Subtask;

import java.time.LocalDate;

public interface SubtaskService {
    Result<Subtask> changeDone(int id,int uid);
    Result<String> deleteSubtask(int id,int uid);
    Result<Subtask> addSubtask(int eid, String content, LocalDate deadline,int uid);
}
