package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.ApiRequest;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.exception.ResourceNotFoundException;
import com.ananya.api_monitor.repository.MonitoredApiRepository;
import com.ananya.api_monitor.service.MonitoredApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitoredApiServiceImpl
        implements MonitoredApiService {

    private final MonitoredApiRepository repository;

    @Override
    public MonitoredApi create(ApiRequest request) {

        MonitoredApi api = MonitoredApi.builder()
                .name(request.getName())
                .url(request.getUrl())
                .method(request.getMethod())
                .expectedStatus(request.getExpectedStatus())
                .active(true)
                .build();

        return repository.save(api);
    }

    @Override
    public List<MonitoredApi> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public MonitoredApi update(Long id, ApiRequest request) {

        MonitoredApi api = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("API not found"));

        api.setName(request.getName());
        api.setUrl(request.getUrl());
        api.setMethod(request.getMethod());
        api.setExpectedStatus(request.getExpectedStatus());

        return repository.save(api);
    }

    @Override
    public MonitoredApi getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "API not found"));
    }
}
