package com.ananya.api_monitor.controller;

import com.ananya.api_monitor.dto.ApiRequest;
import com.ananya.api_monitor.entity.MonitoredApi;
import com.ananya.api_monitor.service.MonitoredApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/monitor")
@RequiredArgsConstructor
public class MonitoredApiController {

    private final MonitoredApiService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MonitoredApi create(@Valid @RequestBody ApiRequest request) {
        return service.create(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MonitoredApi update(@PathVariable Long id, @Valid @RequestBody ApiRequest request) {
        return service.update(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        System.out.println("DELETE CONTROLLER CALLED");
        service.delete(id);
    }

    @GetMapping
    public List<MonitoredApi> getAll() {
        return service.findAll();
    }


    @GetMapping("/{id}")
    public MonitoredApi getById(@PathVariable Long id) {
        return service.getById(id);
    }
}