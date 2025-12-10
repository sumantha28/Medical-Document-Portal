-- Create Medical Documents Database
-- Run this file: mysql -u root -p < create-database.sql

CREATE DATABASE IF NOT EXISTS medical_documents_db;

USE medical_documents_db;

-- Verify database was created
SELECT 'Database medical_documents_db created successfully!' AS Status;

SHOW TABLES;

