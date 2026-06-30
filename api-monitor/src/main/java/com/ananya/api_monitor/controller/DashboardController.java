package com.ananya.api_monitor.controller;

import com.ananya.api_monitor.dto.DashboardResponse;
import com.ananya.api_monitor.dto.ResponseTimePoint;
import com.ananya.api_monitor.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();
    }
    @GetMapping("/response-trend")
    public List<ResponseTimePoint>
    getResponseTrend() {

        return dashboardService
                .getResponseTrend();
    }
}