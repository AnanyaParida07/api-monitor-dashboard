package com.ananya.api_monitor.repository;

import com.ananya.api_monitor.entity.MonitoredApi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonitoredApiRepository
        extends JpaRepository<MonitoredApi, Long> {
}