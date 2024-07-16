package org.example.service.Impl;


import org.example.client.EventClient;
import org.example.entity.Result;
import org.example.entity.Subtask;
import org.example.repository.UserRepo;
import org.example.service.SubtaskService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubtaskServiceImpl implements SubtaskService {
    private final UserRepo userRepo;
    private final EventClient client;
    public SubtaskServiceImpl(UserRepo userRepo, EventClient client) {
        this.userRepo = userRepo;
        this.client = client;
    }
    public int getUid() {//从数据库里查询id
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepo.findUserByUsername(username).getId();
    }
    @Override
    public Result<Subtask> changeDone(int id) {
        return client.changeDone(id, getUid());
    }
    @Override
    public Result<String> deleteSubtask(int id) {
       return client.deleteSubtask(id, getUid());
    }
    @Override
    public Result<Subtask> addSubtask(int eid, String content, LocalDate deadline) {
      return client.addSubtask(eid, content, deadline, getUid());
    }
}
