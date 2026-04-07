# Architecture Decision Record (ADR): Ticket Management System

## Context
The goal is to upgrade the simple Ticket Management System described in the initial PRD to a robust, full-stack application using Angular, Spring Boot, and MySQL.

## Decisions

1.  **Frontend Framework:** Angular (v17+) using Standalone Components and Signals for state management to ensure a reactive and high-performance UI.
2.  **Backend Framework:** Spring Boot 3.x (Java 17+) exposing RESTful APIs. It will use Spring Data JPA for data access.
3.  **Database:** MySQL 8.x for persistent relational storage.
4.  **Architecture Pattern:** N-tier architecture (Controller -> Service -> Repository) for the backend to maintain a clear separation of concerns.
5.  **API Design:** Standard REST API principles (`GET /api/tickets`, `POST /api/tickets`, etc.).
6.  **State Management:** Angular Signals for simple state tracking of tickets.

## Consequences
*   This stack introduces a requirement for users to have a server/database environment instead of a simple local HTML file execution.
*   The architecture is scalable and ready for future features (e.g., authentication, multi-user assignment).
