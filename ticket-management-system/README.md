# 🎫 Ticket Management System (Full Stack)

This repository contains the upgraded Full-Stack implementation of the simple Ticket Management System, architected via the Antigravity developer workflow.

## 🏗️ Architecture Stack
1. **Frontend:** Angular 17+ (Reactive Signals, SCSS, HttpClient interface)
2. **Middleware:** Java 17, Spring Boot 3.x (REST API, Spring Data JPA)
3. **Database:** MySQL 8.0 (Dockerized)

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (For standalone frontend development)
- Java 17+ (For standalone backend development)

### Bootstrapping the Environment
You can launch the entire stack with a single command mapping all dependencies using Docker Compose:

```bash
docker-compose up --build
```
* **Frontend:** Available at `http://localhost:80`
* **Backend API:** Available at `http://localhost:8080/api/tickets`

### Local Development (Frontend)
To develop the frontend specifically, execute:
```bash
cd frontend
npm install
npm start
```
*This will serve the UI via live-reload on `http://localhost:4200`.*

## 🧪 Testing

* **Backend Unit Testing (JUnit 5 & MockMvc):** Run `./mvnw test` inside the `backend` folder.
* **Frontend Component Testing (Jasmine/Karma):** Run `npm test` inside the `frontend` folder.
* **Load Testing (k6):** From the root directory, `k6 run tests/load-tests/k6-load-test.js`

## 🔒 Security
The project includes:
- Environmental variable fallbacks replacing hardcoded DB passwords.
- Configurable Cross-Origin mapping parameters.
- Built-in validation constraints for API requests to mitigate database string injections.

## ⚙️ Pipeline
A fully automated GitHub Action is included inside `.github/workflows/ci-cd.yml` executing tests concurrently for the Node.js frontend and Maven backend on every pull request to the `main` branch.
