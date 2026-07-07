package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.LoginRequest;
import com.ananya.api_monitor.dto.LoginResponse;
import com.ananya.api_monitor.dto.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}
