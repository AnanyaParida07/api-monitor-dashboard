package com.ananya.api_monitor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApiRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String url;

    @NotBlank
    private String method;

    private Integer expectedStatus;
}
