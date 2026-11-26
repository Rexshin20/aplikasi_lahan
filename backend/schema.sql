-- Jalankan lewat MySQL: mysql -u root -p < backend/schema.sql
CREATE DATABASE IF NOT EXISTS aplikasi_lahan
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE aplikasi_lahan;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL DEFAULT 'Jason Doe',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dashboard_stats (
  stat_key VARCHAR(50) PRIMARY KEY,
  value VARCHAR(50) NOT NULL,
  change_value VARCHAR(20) NULL
);

CREATE TABLE IF NOT EXISTS leaders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  project VARCHAR(150) NOT NULL,
  members VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  status_color VARCHAR(50) NOT NULL,
  weeks INT NOT NULL,
  budget VARCHAR(20) NOT NULL
);
