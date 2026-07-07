package com.ananya.api_monitor.scheduler;

import com.ananya.api_monitor.service.ApiMonitoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApiMonitoringScheduler {

    private final ApiMonitoringService monitoringService;

    @Scheduled(fixedRate = 60000)
    public void monitorApis() {

        monitoringService.monitorAllApis();
    }
}