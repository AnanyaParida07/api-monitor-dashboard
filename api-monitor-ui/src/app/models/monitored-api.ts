import { LatestStatusResponse } from "./latest-status-response";

export interface MonitoredApi {
    id: number;
    name: string;
    url: string;
    method: string;
    expectedStatus: number;
    active: boolean;
    latestStatus?: LatestStatusResponse;

}