# 🚀 API Monitoring Dashboard

A full-stack enterprise-style API Monitoring Dashboard built using **Spring Boot**, **Angular**, **PostgreSQL**, **JWT Authentication**, and **Docker**.

The application allows administrators to monitor REST APIs in real time, track response times, analyze uptime statistics, manage monitored APIs, and control user access through Role-Based Access Control (RBAC).

---

## 📸 Screenshots

> *(Add screenshots after deployment)*

- Login Page
- Dashboard
- API Management
- API Details
- User Management
- Create API
- Create User

---

# ✨ Features

## Authentication & Authorization

- JWT Authentication
- Spring Security
- Role-Based Access Control (ADMIN / USER)
- Protected Angular Routes
- Admin-only API Management
- Secure Password Encryption using BCrypt

---

## Dashboard

- Total APIs
- Healthy APIs
- Failed APIs
- Average Response Time
- API Status Distribution (Pie Chart)
- Response Time Trend (Area Chart)
- Auto Refresh every 30 seconds

---

## API Management

- Create API
- Update API
- Delete API
- View API Details
- Search APIs
- Filter APIs by Status
- Pagination
- Response Time Monitoring
- Uptime Statistics

---

## User Management

(Admin Only)

- Create User
- Update User
- Delete User
- Search Users
- Role Management
- Prevent Self Deletion
- Prevent Deleting the Last Administrator
- Prevent Removing the Last Admin Role

---

## UI Features

- Modern Angular Material UI
- Responsive Design
- Reusable Confirmation Dialog
- Notification Service (Snackbars)
- Loading Indicators
- Modern Dashboard Layout
- Enterprise Navigation

---

## Docker Support

Run the entire application using Docker Compose.

Includes:

- Angular Frontend
- Spring Boot Backend
- PostgreSQL Database

No local Java, Node.js, or PostgreSQL installation required.

---

# 🛠️ Technology Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT
- Maven
- Lombok

---

## Frontend

- Angular
- Angular Material
- ApexCharts
- RxJS
- TypeScript
- SCSS

---

## DevOps

- Docker
- Docker Compose
- Nginx

---

# 🏗️ Architecture

```
Angular UI
       │
       ▼
REST API (JWT)
       │
       ▼
Spring Boot
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼
PostgreSQL   Scheduled API Monitoring
```

---

# 📁 Project Structure

```
api-monitor/
│
├── api-monitor/
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── security
│   ├── scheduler
│   └── config
│
├── api-monitor-ui/
│   ├── pages
│   ├── services
│   ├── guards
│   ├── interceptors
│   ├── models
│   └── shared
│
└── docker-compose.yml
```

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
Spring Security
      │
      ▼
JWT Generated
      │
      ▼
Angular stores Token
      │
      ▼
HTTP Interceptor
      │
      ▼
Authorization Header
      │
      ▼
Protected APIs
```

---

# 🚀 Getting Started

## Prerequisites

- Docker Desktop

---

## Clone Repository

```bash
git clone https://github.com/<your-username>/api-monitor.git
```

```bash
cd api-monitor
```

---

## Run Application

```bash
docker compose up --build
```

---

## Access Application

Frontend

```
http://localhost:4200
```

Backend

```
http://localhost:7070
```

---

# 🔑 Default Admin Login

Username

```
admin
```

Password

```
admin123
```

> Change the default password after first login in a production environment.

---

# 📊 API Monitoring Workflow

```
Scheduler
      │
      ▼
Fetch Registered APIs
      │
      ▼
Send HTTP Request
      │
      ▼
Capture Status Code
      │
      ▼
Capture Response Time
      │
      ▼
Store History
      │
      ▼
Dashboard Statistics
```

---

# 📌 Future Enhancements

- Dark Mode
- Email Notifications
- Slack Integration
- API Health Alerts
- Export Reports (CSV/PDF)
- Audit Logs
- User Profile Management
- Multi-Environment Monitoring

---

# 👩‍💻 Author

**Ananya Parida**

Java Full Stack Developer

LinkedIn:
https://www.linkedin.com/in/ananya-parida-39875b249/<your-linkedin>

---

# ⭐ If you found this project useful, consider giving it a star!