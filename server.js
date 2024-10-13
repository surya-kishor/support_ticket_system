const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
//const routes = require('./routes/tickets');
//rest obj
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());


const db = require('./config/db');

// Create a new ticket
app.post('/tickets', (req, res) => {
    const { title, description } = req.body;    
    const query = 'INSERT INTO tickets (title, description) VALUES (?, ?)';
    db.query(query, [title, description], (err, result) => {        
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, title, description });
    });
});

//List tickets
app.get('/tickets', (req, res) => {
    const query = 'SELECT * FROM tickets where deleted = 0';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get a specific ticket
app.get('/tickets/:id', (req, res) => {
    const sql = 'SELECT * FROM tickets WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

//Update ticket
app.put('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const query = 'UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?';
    
    db.query(query, [title, description, status, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id, title, description, status });
    });
});

//delete ticket
app.delete('/tickets/:id', (req, res) => {    
    const { id } = req.params;
    //const query = 'DELETE FROM tickets WHERE id = ?';
    const query = 'UPDATE tickets SET deleted = 1 WHERE id = ?'
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Ticket deleted successfully' });
    });
});

// Assign a ticket
app.patch('/tickets/:id/assign', (req, res) => {
    const ticketId = req.params.id;
    const { assigned_to } = req.body;
    const query = 'UPDATE tickets SET assigned_to = ? WHERE id = ?';
    db.query(query, [assigned_to, ticketId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Ticket assigned successfully' });
    });
});

// Move ticket status
app.patch('/tickets/:id/status', (req, res) => {
    const ticketId = req.params.id;
    const { status } = req.body;
    const query = 'UPDATE tickets SET status = ? WHERE id = ?';
    db.query(query, [status, ticketId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Ticket status updated successfully' });
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;