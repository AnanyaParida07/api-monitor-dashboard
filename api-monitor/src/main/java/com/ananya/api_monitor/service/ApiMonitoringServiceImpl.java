package com.ananya.api_monitor.service;

import com.ananya.api_monitor.entity.ApiCheckHistory;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.repository.ApiCheckHistoryRepository;
import com.ananya.api_monitor.repository.MonitoredApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiMonitoringServiceImpl implements ApiMonitoringService {

    private final MonitoredApiRepository apiRepository;
    private final ApiCheckHistoryRepository historyRepository;
    private final RestTemplate restTemplate;

    @Override
    public void monitorAllApis() {
        List<MonitoredApi> apis = apiRepository.findAll();

        for (MonitoredApi api : apis) {
            checkApi(api);
        }
    }

    private void checkApi(MonitoredApi api) {
        long startTime = System.currentTimeMillis();
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    api.getUrl(), HttpMethod.valueOf(api.getMethod()), null, String.class);

            long responseTime = System.currentTimeMillis() - startTime;

            String status;
            if (response.getStatusCode().value() == api.getExpectedStatus()) {
                status = "UP";
            } else {
                status = "DOWN";
            }

            ApiCheckHistory history = ApiCheckHistory.builder()
                    .status(status).statusCode(response.getStatusCode().value())
                    .responseTime(responseTime).checkedAt(LocalDateTime.now()).monitoredApi(api).build();
            historyRepository.save(history);
        }
        catch (Exception ex) {
            long responseTime = System.currentTimeMillis() - startTime;
            ApiCheckHistory history = ApiCheckHistory.builder().status("DOWN")
                    .responseTime(responseTime).errorMessage(ex.getMessage() != null ? ex.getMessage()
                            .substring(0, Math.min(ex.getMessage().length(), 250)) : null)
                            .checkedAt(LocalDateTime.now()).monitoredApi(api).build();
            historyRepository.save(history);
        }
    }
}