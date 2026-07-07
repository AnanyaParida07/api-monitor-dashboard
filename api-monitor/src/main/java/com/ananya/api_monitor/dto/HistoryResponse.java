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
public class HistoryResponse {

    private Long id;
    private String status;
    private Integer statusCode;
    private Long responseTime;
    private String errorMessage;
    private LocalDateTime checkedAt;
}