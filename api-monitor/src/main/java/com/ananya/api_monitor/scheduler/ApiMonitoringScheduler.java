package com.ananya.api_monitor.scheduler;

import com.ananya.api_monitor.entity.ApiCheckHistory;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.repository.ApiCheckHistoryRepository;
import com.ananya.api_monitor.repository.MonitoredApiRepository;
import com.ananya.api_monitor.service.ApiMonitoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ApiMonitoringScheduler {

    private final ApiMonitoringService monitoringService;

    @Scheduled(fixedRate = 60000)
    public void monitorApis() {

        monitoringService.monitorAllApis();
    }
}