package com.ananya.api_monitor.dto;

import com.ananya.api_monitor.entity.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {

    @NotBlank
    private String username;

    private String password;

    private Role role;
}