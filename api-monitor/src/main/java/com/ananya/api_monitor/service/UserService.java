package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.UserRequest;
import com.ananya.api_monitor.dto.UserResponse;
import com.ananya.api_monitor.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse createUser(UserRequest request);

    UserResponse updateUser(
            Long id,
            UserUpdateRequest request
    );

    void deleteUser(Long id);
}