package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.HistoryResponse;
import com.ananya.api_monitor.dto.LatestStatusResponse;
import com.ananya.api_monitor.dto.UptimeResponse;
import com.ananya.api_monitor.entity.ApiCheckHistory;

import java.util.List;

public interface ApiCheckHistoryService {
    List<HistoryResponse> getHistory(Long apiId);
    LatestStatusResponse getLatestStatus(Long apiId);
    UptimeResponse getUptime(Long apiId);
}
