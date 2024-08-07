package org.example.service.Impl;


import org.example.entity.RegisterRequest;
import org.example.entity.Result;
import org.example.entity.User;
import org.example.repository.UserRepo;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
    UserRepo userRepository;
    public MyUserDetailsService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DisabledException{
        User user = userRepository.findUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("未找到用户");
        }
        List< GrantedAuthority > authorities = new ArrayList<>();
        authorities.add((GrantedAuthority) () -> "ROLE_" + user.getRole());

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),  true, true, true, true, authorities);
    }

    public Result<User> deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return Result.success(null);
        } else {
            return Result.error(404, "用户不存在！");
        }
    }
    @Cacheable(value = "user", key = "#email")
    public Result<User> getUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            return Result.error(404, "用户不存在！");
        }
        return Result.success(user);
    }
    public int getUid() {//从数据库里查询id
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findUserByEmail(username).getId();
    }
    public User.roleT getRole() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findUserByEmail(username).getRole();
    }
    public Result<User> getUserById(int uid) {
        User user = userRepository.findUserById(uid);
        if (user == null) {
            return Result.error(404, "用户不存在！");
        }
        return Result.success(user);
    }
    public Result<User> addUser(RegisterRequest request) {
        if (userRepository.findUserByEmail(request.getEmail()) != null) {
            return Result.error(400, "用户已存在！");
        }
        User user = request.toUser();
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return Result.success(user);
    }
    @CacheEvict(value = "user", key = "#email")
    public Result<User> updateUserByEmail(User user, String email) {//更新用户信息 传入用户信息和用户邮箱
        User oldUser = userRepository.findUserByEmail(email);
        if(user.getUsername() != null) {
            oldUser.setUsername(user.getUsername());
        }
        if(user.getChallenge() != null) {
            oldUser.setChallenge(user.getChallenge());
        }
        if(user.getSleep_schedule() != null) {
            oldUser.setSleep_schedule(user.getSleep_schedule());
        }
        if(user.getIdentity() != null) {
            oldUser.setIdentity(user.getIdentity());
        }
        if(user.getExercise() != null) {
            oldUser.setExercise(user.getExercise());
        }
        userRepository.save(oldUser);
        return Result.success(oldUser);
    }
}
