package com.ananya.api_monitor.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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