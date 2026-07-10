package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.UserRequest;
import com.ananya.api_monitor.dto.UserResponse;
import com.ananya.api_monitor.dto.UserUpdateRequest;
import com.ananya.api_monitor.entity.Role;
import com.ananya.api_monitor.entity.User;
import com.ananya.api_monitor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }

    @Override
    public UserResponse createUser(UserRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder().username(request.getUsername()).password(passwordEncoder.encode(request.getPassword())).role(request.getRole()).build();
        return mapToResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(request.getUsername());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        // Prevent removing the last admin
        if (user.getRole() == Role.ADMIN && request.getRole() == Role.USER && userRepository.countByRole(Role.ADMIN) == 1) {
            throw new RuntimeException("At least one administrator must remain.");
        }
        user.setRole(request.getRole());
        return mapToResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (user.getUsername().equals(currentUsername)) {
            throw new RuntimeException("You cannot delete your own account.");
        }
        // Cannot delete the last administrator
        if (user.getRole() == Role.ADMIN && userRepository.countByRole(Role.ADMIN) == 1) {
            throw new RuntimeException("The last administrator cannot be deleted.");
        }
        userRepository.delete(user);

    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder().id(user.getId()).username(user.getUsername()).role(user.getRole()).build();
    }
}