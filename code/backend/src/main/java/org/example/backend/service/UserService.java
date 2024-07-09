package org.example.backend.service;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;

import java.util.concurrent.ExecutionException;

public interface UserService {
    public Result<User> addUser(User user);

    public Result<User> getUserByUsername(String username) throws ExecutionException, InterruptedException;

    public Result<User> getUserByDocId(String docId) throws ExecutionException, InterruptedException;
}
