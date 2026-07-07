package com.ananya.api_monitor.controller;

import com.ananya.api_monitor.dto.HistoryResponse;
import com.ananya.api_monitor.dto.LatestStatusResponse;
import com.ananya.api_monitor.dto.UptimeResponse;
import com.ananya.api_monitor.service.ApiCheckHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class ApiCheckHistoryController {

    private final ApiCheckHistoryService service;

    @GetMapping("/{apiId}")
    public List<HistoryResponse> getHistory(
            @PathVariable Long apiId) {
        return service.getHistory(apiId);
    }
    @GetMapping("/{apiId}/latest")
    public LatestStatusResponse getLatestStatus(
            @PathVariable Long apiId) {
        return service.getLatestStatus(apiId);
    }
    @GetMapping("/{apiId}/uptime")
    public UptimeResponse getUptime(
            @PathVariable Long apiId) {
        return service.getUptime(apiId);
    }
}
