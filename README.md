# API Monitoring Dashboard

A full-stack application that continuously monitors REST APIs, tracks their health, measures response times, and displays real-time monitoring statistics through an interactive dashboard.

## Features

* Monitor multiple REST APIs
* Scheduled health checks using Spring Scheduler
* Track API status (UP/DOWN)
* Measure response time
* Store monitoring history
* Uptime percentage calculation
* Dashboard with charts and statistics
* API CRUD operations
* Dockerized backend, frontend, and PostgreSQL
* Responsive Angular UI

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Scheduler
* PostgreSQL
* Maven

### Frontend

* Angular
* Angular Material
* TypeScript
* SCSS
* ApexCharts

### DevOps

* Docker
* Docker Compose
* Nginx

## Architecture

```
Angular (Nginx)
        │
        ▼
Spring Boot REST API
        │
        ▼
PostgreSQL
```

The scheduler periodically checks every active API, stores the result in the database, and updates the dashboard.

## Project Structure

```
project_api_monitor
│
├── api-monitor
│   ├── src
│   ├── Dockerfile
│   └── pom.xml
│
├── api-monitor-ui
│   ├── src
│   ├── Dockerfile
│   └── nginx.conf
│
└── docker-compose.yml
```

## Running with Docker

Clone the repository.

```bash
git clone https://github.com/<your-github-username>/api-monitor-dashboard.git
```

Move into the project directory.

```bash
cd project_api_monitor
```

Build and start the application.

```bash
docker compose up --build
```

Application URLs:

Frontend

```
http://localhost:4200
```

Backend

```
http://localhost:7070
```

## API Endpoints

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | /api/monitor                | Get all monitored APIs |
| GET    | /api/monitor/{id}           | Get API by ID          |
| POST   | /api/monitor                | Create API             |
| PUT    | /api/monitor/{id}           | Update API             |
| DELETE | /api/monitor/{id}           | Delete API             |
| GET    | /api/history/{apiId}        | API history            |
| GET    | /api/history/{apiId}/latest | Latest API status      |
| GET    | /api/history/{apiId}/uptime | Uptime percentage      |
| GET    | /api/dashboard              | Dashboard statistics   |

## Future Enhancements

* JWT Authentication
* Email Alerts
* SMS Notifications
* Export History to CSV/PDF
* Role-Based Access Control
* Swagger/OpenAPI Documentation
* Kubernetes Deployment
* Prometheus & Grafana Integration

## Screenshots

Add screenshots of:

* Dashboard
* API List
* Create API
* History Page
* Docker Containers
* Charts

## Author

Ananya
Java Full Stack Developer
