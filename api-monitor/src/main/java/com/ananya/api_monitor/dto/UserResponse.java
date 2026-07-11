package com.ananya.api_monitor.dto;

import com.ananya.api_monitor.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String username;

    private Role role;
}