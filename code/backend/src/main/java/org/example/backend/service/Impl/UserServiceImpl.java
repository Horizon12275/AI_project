package org.example.backend.service.Impl;

import org.example.backend.entity.Result;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepo;
import org.example.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo repository;
    public UserServiceImpl(UserRepo repository) {
        this.repository = repository;
    }
    @Override
    public Result<User> addUser(User user) {
       return Result.success(repository.save(user));
    }

    @Override
    public Result<User> getUserByUsername(String username) throws ExecutionException, InterruptedException {
        User user = repository.findUserByUsername(username);
        if (user != null) {
            return Result.success(user);
        } else {
            return Result.error(404, "User not found");
        }
    }
    @Override
    public Result<User> getUserByDocId(String docId) throws ExecutionException, InterruptedException {
        return Result.error(404,"User not found");
    }

}
