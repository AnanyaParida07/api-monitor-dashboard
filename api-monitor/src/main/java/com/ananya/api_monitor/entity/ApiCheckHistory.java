package com.ananya.api_monitor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "api_check_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiCheckHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private Integer statusCode;

    private Long responseTime;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private LocalDateTime checkedAt;

    @ManyToOne
    @JoinColumn(name = "api_id")
    private MonitoredApi monitoredApi;
}
