-- MySQL Database Initialization Script
-- Ticket Management System

CREATE DATABASE IF NOT EXISTS ticket_db;
USE ticket_db;

-- Drop table if it exists
DROP TABLE IF EXISTS tickets;

-- Create Tickets table
CREATE TABLE tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('New', 'Assigned', 'Done', 'Escalate') NOT NULL DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial dummy data for testing
INSERT INTO tickets (name, description, status) VALUES 
('Setup Database Server', 'Install and configure MySQL 8 on the internal development server.', 'Done'),
('Fix Login Bug', 'Investigate and resolve the intermittent login session timeout reported by QA.', 'Assigned'),
('Prepare Q3 Marketing Assets', 'Draft the new email templates for the upcoming Q3 product launch.', 'New');
