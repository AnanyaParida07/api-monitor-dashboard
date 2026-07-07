package com.ananya.api_monitor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UptimeResponse {

    private double uptimePercentage;
    private long totalChecks;
    private long successfulChecks;
}