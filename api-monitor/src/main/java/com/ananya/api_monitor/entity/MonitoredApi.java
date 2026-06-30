package com.ananya.api_monitor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "monitored_api")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitoredApi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    private String method;

    private Integer expectedStatus;

    private Boolean active;
}
