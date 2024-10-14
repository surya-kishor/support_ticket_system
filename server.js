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
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/tickets', ticketRoutes);


// // Assign a ticket
// app.patch('/tickets/:id/assign', (req, res) => {
//     const ticketId = req.params.id;
//     const { assigned_to } = req.body;
//     const query = 'UPDATE tickets SET assigned_to = ? WHERE id = ?';
//     db.query(query, [assigned_to, ticketId], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: 'Ticket assigned successfully' });
//     });
// });

// // Move ticket status
// app.patch('/tickets/:id/status', (req, res) => {
//     const ticketId = req.params.id;
//     const { status } = req.body;
//     const query = 'UPDATE tickets SET status = ? WHERE id = ?';
//     db.query(query, [status, ticketId], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: 'Ticket status updated successfully' });
//     });
// });



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;