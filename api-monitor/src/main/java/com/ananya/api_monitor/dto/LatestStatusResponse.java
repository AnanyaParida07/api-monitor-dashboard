package com.ananya.api_monitor.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LatestStatusResponse {

    private String status;

    private Integer statusCode;

    private Long responseTime;

    private LocalDateTime checkedAt;
}