package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.ApiRequest;
import com.ananya.api_monitor.entity.MonitoredApi;

import java.util.List;

public interface MonitoredApiService {

    MonitoredApi create(ApiRequest request);

    List<MonitoredApi> findAll();

    void delete(Long id);

    MonitoredApi update(Long id, ApiRequest request);

    MonitoredApi getById(Long id);
}
