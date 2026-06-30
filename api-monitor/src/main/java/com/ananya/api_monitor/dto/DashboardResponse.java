package com.ananya.api_monitor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalApis;

    private Long healthyApis;

    private Long failedApis;

    private Double averageResponseTime;
}
