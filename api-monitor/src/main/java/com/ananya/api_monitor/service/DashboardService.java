package com.ananya.api_monitor.service;

import com.ananya.api_monitor.dto.DashboardResponse;
import com.ananya.api_monitor.dto.ResponseTimePoint;

import java.util.List;

public interface DashboardService {

    DashboardResponse getDashboard();

    List<ResponseTimePoint> getResponseTrend();
}