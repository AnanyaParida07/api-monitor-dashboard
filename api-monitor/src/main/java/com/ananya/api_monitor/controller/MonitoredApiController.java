package com.ananya.api_monitor.controller;

import com.ananya.api_monitor.dto.ApiRequest;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.service.MonitoredApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monitor")
@RequiredArgsConstructor
public class MonitoredApiController {

    private final MonitoredApiService service;

    @PostMapping
    public MonitoredApi create(
            @Valid @RequestBody ApiRequest request) {

        return service.create(request);
    }

    @PutMapping("/{id}")
    public MonitoredApi update(
            @PathVariable Long id,
            @Valid @RequestBody ApiRequest request) {

        return service.update(id, request);
    }

    @GetMapping
    public List<MonitoredApi> getAll() {
        return service.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public MonitoredApi getById(
            @PathVariable Long id) {

        return service.getById(id);
    }
}