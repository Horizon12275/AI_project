package org.example.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private User.roleT role;
    private Integer sleep_schedule;
    private Integer identity;
    private Integer challenge;
    private Integer exercise;

    public User toUser(){//将注册请求转换为用户实体
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setSleep_schedule(sleep_schedule);
        user.setIdentity(identity);
        user.setChallenge(challenge);
        user.setExercise(exercise);
        return user;
    }
}
