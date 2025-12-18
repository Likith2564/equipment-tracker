```
# Equipment Tracker

A simple full-stack application to track equipment inventory and status. Built with **React**, **Node.js**, and **MySQL**.

## 🛠️ Tech Stack
* **Frontend:** React.js, Axios
* **Backend:** Node.js, Express
* **Database:** MySQL

---

## 🚀 How to Run

### 1. Database Setup
Run this SQL code in your MySQL Workbench to create the table with the correct status options:

```sql
CREATE DATABASE IF NOT EXISTS equipment_db;
USE equipment_db;

CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Inactive', 'Under Maintenance') DEFAULT 'Active',
    last_cleaned_date DATE NOT NULL
);

-- Optional: Insert dummy data to test
INSERT INTO equipment (name, type, status, last_cleaned_date) 
VALUES ('Industrial Mixer', 'Mixer', 'Active', '2025-12-01');

```

### 2. Backend (Server)

1. Go to server folder: `cd server`
2. Install packages: `npm install`
3. Setup `.env` file (copy from `.env.example` and add your password).
4. Run server: `node server.js`

### 3. Frontend (Client)

1. Go to client folder: `cd client`
2. Install packages: `npm install`
3. Run app: `npm start`

```
