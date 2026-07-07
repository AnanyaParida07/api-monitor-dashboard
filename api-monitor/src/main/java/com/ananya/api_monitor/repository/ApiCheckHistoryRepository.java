package com.ananya.api_monitor.repository;

import com.ananya.api_monitor.entity.ApiCheckHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApiCheckHistoryRepository extends JpaRepository<ApiCheckHistory, Long> {

    List<ApiCheckHistory> findTop50ByMonitoredApiIdOrderByCheckedAtDesc(Long apiId);

    Optional<ApiCheckHistory> findTopByMonitoredApiIdOrderByCheckedAtDesc(Long apiId);

    long countByMonitoredApiId(Long apiId);

    long countByMonitoredApiIdAndStatus(Long apiId, String status);

    List<ApiCheckHistory> findTop20ByOrderByCheckedAtDesc();

    void deleteByMonitoredApiId(Long apiId);
}
