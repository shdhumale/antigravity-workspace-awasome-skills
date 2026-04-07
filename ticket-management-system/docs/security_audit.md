# Phase 6: Security & Code Quality Audit

## Overview
This document represents the findings from the automated execution of the **007 (Security Hardening)** and **codebase-audit-pre-push** Antigravity skills. 

## 1. Security Analysis (OWASP)

### Findings:
*   **CORS Configuration (CWE-942):** The Angular origin URL is hardcoded into `@CrossOrigin` within the Controller. This violates security lifecycle principles since moving to production would require modifying code instead of injecting an environment variable.
*   **Input Validation & XSS (CWE-20/CWE-79):** The `Ticket` Entity doesn't restrict character length for strings (`name` or `description`). Without `@NotBlank` or `@Size`, empty names can be saved, or malicious, excessively long XSS payloads could be injected into the backend storage.
*   **SQL Injection (CWE-89):** Fortunately, Spring Data JPA completely mitigates standard SQL injections via parameter binding internally. No vulnerabilities found here.
*   **Secret Management (CWE-798):** `application.properties` contains plaintext passwords (`spring.datasource.password=password`). 

### Action Plan:
1.  **Refactor CORS** into a dedicated `WebMvcConfigurer` allowing dynamic properties injected from `.env` or application configs.
2.  **Add `jakarta.validation`** constraints (`@NotBlank`, `@Size`) directly to the `Ticket` DTOs/Entities.
3.  **Environment Variables:** Refactor `application.properties` to utilize `${MYSQL_ROOT_PASSWORD}` syntax instead of hardcoded strings for database connectivity.

## 2. Code Quality & Pre-Push Analysis

*   **Dead Code:** None found. Signal reactivity in the Angular layer maps perfectly to the UI.
*   **Refactoring Opportunities:** 
    *   *Frontend:* Consider adding an HTTP Interceptor for loading indicators instead of toggling `loading()` booleans manually in each service call.
    *   *Backend:* Creating a distinct `TicketDTO` logic abstraction so that the raw `Ticket` entity isn't automatically exposed across the API boundaries. For now, since it mimics the PRD MVP, it passes limits.

---
*Status: Applying necessary mitigations immediately via codebase patches.*
