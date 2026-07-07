package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.HistoryResponse;
import com.ananya.api_monitor.dto.LatestStatusResponse;
import com.ananya.api_monitor.dto.UptimeResponse;
import com.ananya.api_monitor.entity.ApiCheckHistory;
import com.ananya.api_monitor.repository.ApiCheckHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApiCheckHistoryServiceImpl implements ApiCheckHistoryService {

    private final ApiCheckHistoryRepository repository;


    @Override
    public List<HistoryResponse> getHistory(Long apiId) {
        return repository.findTop50ByMonitoredApiIdOrderByCheckedAtDesc(apiId).stream().map(
                history -> HistoryResponse.builder()
                        .id(history.getId()).status(history.getStatus()).statusCode(history.getStatusCode())
                        .responseTime(history.getResponseTime())
                        .errorMessage(history.getErrorMessage())
                        .checkedAt(history.getCheckedAt()).build()).toList();
    }

    @Override
    public LatestStatusResponse getLatestStatus(Long apiId) {

        Optional<ApiCheckHistory> optionalHistory = repository.findTopByMonitoredApiIdOrderByCheckedAtDesc(apiId);

        if (optionalHistory.isEmpty()) {

            return LatestStatusResponse.builder().status("UNKNOWN").statusCode(null).responseTime(null).checkedAt(null).build();
        }

        ApiCheckHistory history = optionalHistory.get();

        return LatestStatusResponse.builder().status(history.getStatus()).statusCode(history.getStatusCode()).responseTime(history.getResponseTime()).checkedAt(history.getCheckedAt()).build();
    }

    @Override
    public UptimeResponse getUptime(Long apiId) {
        long totalChecks = repository.countByMonitoredApiId(apiId);

        long successfulChecks = repository.countByMonitoredApiIdAndStatus(apiId, "UP");

        if (totalChecks == 0) {

            return UptimeResponse.builder().uptimePercentage(0).totalChecks(0).successfulChecks(0).build();
        }

        double uptimePercentage = ((double) successfulChecks / totalChecks) * 100;

        return UptimeResponse.builder().uptimePercentage(Math.round(uptimePercentage * 100) / 100.0).totalChecks(totalChecks).successfulChecks(successfulChecks).build();
    }
}
