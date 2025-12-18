# 🧰 Equipment Tracker

A simple **full-stack web application** to track equipment inventory and status.  
Built using **React**, **Node.js**, **Express**, and **MySQL**.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios  
- **Backend:** Node.js, Express  
- **Database:** MySQL  

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

## 🗄️ Database Setup

Run the following SQL commands in **MySQL Workbench**:

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

-- Optional: Insert sample data
INSERT INTO equipment (name, type, status, last_cleaned_date) 
VALUES ('Industrial Mixer', 'Mixer', 'Active', '2025-12-01');


⚙️ Backend Setup (Server)
Navigate to the server folder:

bash
Copy code
cd server
Install dependencies:

bash
Copy code
npm install
Create a .env file:

Copy .env.example

Add your database credentials

Start the server:

bash
Copy code
node server.js
💻 Frontend Setup (Client)
Navigate to the client folder:

bash
Copy code
cd client
Install dependencies:

bash
Copy code
npm install
Start the React app:

bash
Copy code
npm start