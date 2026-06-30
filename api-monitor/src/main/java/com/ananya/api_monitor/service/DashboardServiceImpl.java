package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.DashboardResponse;
import com.ananya.api_monitor.dto.ResponseTimePoint;
import com.ananya.api_monitor.entity.ApiCheckHistory;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.repository.ApiCheckHistoryRepository;
import com.ananya.api_monitor.repository.MonitoredApiRepository;
import com.ananya.api_monitor.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final MonitoredApiRepository apiRepository;
    private final ApiCheckHistoryRepository historyRepository;

    @Override
    public DashboardResponse getDashboard() {

        List<MonitoredApi> apis =
                apiRepository.findAll();

        long healthyApis = 0;
        long failedApis = 0;

        for (MonitoredApi api : apis) {

            List<ApiCheckHistory> history =
                    historyRepository
                            .findTop50ByMonitoredApiIdOrderByCheckedAtDesc(
                                    api.getId());

            if (!history.isEmpty()) {

                ApiCheckHistory latest =
                        history.get(0);

                if ("UP".equals(latest.getStatus())) {
                    healthyApis++;
                } else {
                    failedApis++;
                }
            }
        }

        double averageResponseTime =
                historyRepository.findAll()
                        .stream()
                        .filter(h -> h.getResponseTime() != null)
                        .mapToLong(ApiCheckHistory::getResponseTime)
                        .average()
                        .orElse(0);

        return DashboardResponse.builder()
                .totalApis((long) apis.size())
                .healthyApis(healthyApis)
                .failedApis(failedApis)
                .averageResponseTime(averageResponseTime)
                .build();
    }

    @Override
    public List<ResponseTimePoint> getResponseTrend() {

        List<ApiCheckHistory> history =
                historyRepository
                        .findTop20ByOrderByCheckedAtDesc();

        return history.stream()
                .map(item ->
                        ResponseTimePoint.builder()
                                .timestamp(
                                        item.getCheckedAt()
                                                .toLocalTime()
                                                .toString()
                                )
                                .responseTime(
                                        item.getResponseTime()
                                )
                                .build()
                )
                .toList();
    }
}