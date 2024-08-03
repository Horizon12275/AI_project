package org.example.service.Impl;

import org.example.entity.RegisterRequest;
import org.example.entity.Result;
import org.example.entity.User;
import org.example.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

class MyUserDetailsServiceTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private MyUserDetailsService userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole(User.roleT.user);

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername("test@example.com");
        assertNotNull(userDetails);
        assertEquals("test@example.com", userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_user")));
    }

    @Test
    void loadUserByUsername_UserNotFound() {
        when(userRepo.findUserByEmail("unknown@example.com")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("unknown@example.com");
        });
    }

    @Test
    void deleteUser() {
        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        when(userRepo.existsById(1)).thenReturn(true);

        Result<User> result = userDetailsService.deleteUser(1);
        assertEquals(200, result.getCode());
    }

    @Test
    void deleteUser_UserNotFound() {
        when(userRepo.existsById(1)).thenReturn(false);

        Result<User> result = userDetailsService.deleteUser(1);
        assertEquals(404, result.getCode());
        assertEquals("用户不存在！", result.getMessage());
    }

    @Test
    void getUserByUsername() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(user);

        Result<User> result = userDetailsService.getUserByUsername("test@example.com");
        assertEquals(200, result.getCode());
        assertEquals(user, result.getData());
    }

    @Test
    void getUserByUsername_UserNotFound() {
        when(userRepo.findUserByEmail("unknown@example.com")).thenReturn(null);

        Result<User> result = userDetailsService.getUserByUsername("unknown@example.com");
        assertEquals(404, result.getCode());
        assertEquals("用户不存在！", result.getMessage());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void getUid() {
        // 创建一个模拟的用户对象，并设置其属性
        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        // 当 userRepo 调用 findUserByEmail 方法时，返回上面创建的用户对象
        when(userRepo.findUserByEmail("test@example.com")).thenReturn(user);

        // 模拟 SecurityContext 来返回包含模拟用户的认证信息
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        UserDetails userDetails = mock(UserDetails.class);

        // 设置模拟的 UserDetails 对象返回指定的用户名
        when(userDetails.getUsername()).thenReturn("test@example.com");

        // 设置模拟的 Authentication 对象返回上面设置的 UserDetails 对象
        when(authentication.getPrincipal()).thenReturn(userDetails);

        // 设置模拟的 SecurityContext 对象返回上面设置的 Authentication 对象
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // 将模拟的 SecurityContext 对象设置到 SecurityContextHolder 中
        SecurityContextHolder.setContext(securityContext);

        // 调用 getUid 方法并验证其返回值是否正确
        int uid = userDetailsService.getUid();
        assertEquals(1, uid);
    }


    @Test
    @WithMockUser(username = "test@example.com")
    void getRole() {
        User user = new User();
        user.setRole(User.roleT.user);
        user.setEmail("test@example.com");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(user);

        // 模拟 SecurityContext 来返回包含模拟用户的认证信息
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        UserDetails userDetails = mock(UserDetails.class);

        // 设置模拟的 UserDetails 对象返回指定的用户名
        when(userDetails.getUsername()).thenReturn("test@example.com");

        // 设置模拟的 Authentication 对象返回上面设置的 UserDetails 对象
        when(authentication.getPrincipal()).thenReturn(userDetails);

        // 设置模拟的 SecurityContext 对象返回上面设置的 Authentication 对象
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // 将模拟的 SecurityContext 对象设置到 SecurityContextHolder 中
        SecurityContextHolder.setContext(securityContext);

        User.roleT role = userDetailsService.getRole();
        assertEquals(User.roleT.user, role);
    }

    @Test
    void getUserById() {
        User user = new User();
        user.setId(1);

        when(userRepo.findUserById(1)).thenReturn(user);

        Result<User> result = userDetailsService.getUserById(1);
        assertEquals(200, result.getCode());
        assertEquals(user, result.getData());
    }

    @Test
    void getUserById_UserNotFound() {
        when(userRepo.findUserById(1)).thenReturn(null);

        Result<User> result = userDetailsService.getUserById(1);
        assertEquals(404, result.getCode());
        assertEquals("用户不存在！", result.getMessage());
    }

    @Test
    void register() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setUsername("testuser");
        request.setPassword("password");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(null);
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Result<User> result = userDetailsService.register(request);
        assertEquals(200, result.getCode());
        assertEquals("test@example.com", result.getData().getEmail());
        assertEquals("testuser", result.getData().getUsername());
    }

    @Test
    void register_UserExists() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setUsername("testuser");
        request.setPassword("password");

        User existingUser = new User();
        existingUser.setEmail("test@example.com");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(existingUser);

        Result<User> result = userDetailsService.register(request);
        assertEquals(400, result.getCode());
        assertEquals("用户已存在！", result.getMessage());
    }

    @Test
    @WithMockUser(username = "test@example.com")
    void portrait() {
        User user = new User();
        user.setChallenge(1);
        user.setSleep_schedule(2);
        user.setIdentity(3);
        user.setExercise(4);

        User existingUser = new User();
        existingUser.setEmail("test@example.com");

        when(userRepo.findUserByEmail("test@example.com")).thenReturn(existingUser);
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // 模拟 SecurityContext 来返回包含模拟用户的认证信息
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        UserDetails userDetails = mock(UserDetails.class);

        // 设置模拟的 UserDetails 对象返回指定的用户名
        when(userDetails.getUsername()).thenReturn("test@example.com");

        // 设置模拟的 Authentication 对象返回上面设置的 UserDetails 对象
        when(authentication.getPrincipal()).thenReturn(userDetails);

        // 设置模拟的 SecurityContext 对象返回上面设置的 Authentication 对象
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // 将模拟的 SecurityContext 对象设置到 SecurityContextHolder 中
        SecurityContextHolder.setContext(securityContext);

        Result<User> result = userDetailsService.portrait(user);
        assertEquals(200, result.getCode());
        assertEquals(1, result.getData().getChallenge());
        assertEquals(2, result.getData().getSleep_schedule());
        assertEquals(3, result.getData().getIdentity());
        assertEquals(4, result.getData().getExercise());
    }
}
