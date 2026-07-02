package com.ananya.api_monitor.controller;

import com.ananya.api_monitor.dto.LoginRequest;
import com.ananya.api_monitor.dto.LoginResponse;
import com.ananya.api_monitor.dto.RegisterRequest;
import com.ananya.api_monitor.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
