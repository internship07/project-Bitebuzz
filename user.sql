-- SQL file for BiteBuzz Food Ordering System

CREATE DATABASE IF NOT EXISTS bitebuzz;
USE bitebuzz;

-- User table
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(20) NOT NULL
);
