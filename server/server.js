const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

app.get('/api/equipment', (req, res) => {
    const sql = 'SELECT * FROM equipment ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/equipment', (req, res) => {
    const { name, type, status, last_cleaned_date } = req.body;
    const sql = 'INSERT INTO equipment (name, type, status, last_cleaned_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, type, status, last_cleaned_date], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

app.put('/api/equipment/:id', (req, res) => {
    const { name, type, status, last_cleaned_date } = req.body;
    const sql = 'UPDATE equipment SET name=?, type=?, status=?, last_cleaned_date=? WHERE id=?';
    db.query(sql, [name, type, status, last_cleaned_date, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Updated successfully" });
    });
});

app.delete('/api/equipment/:id', (req, res) => {
    const sql = 'DELETE FROM equipment WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted successfully" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});