const express = require('express');
const router = express.Router();
const {createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, assignToTicket,moveTicketStatus} = require('../controllers/ticketController');
// Create a new ticket
router.post('/', createTicket);
//List tickets
 router.get('/', getAllTickets);
// Get a specific ticket
router.get('/:id', getTicketById);
//Update ticket
router.put('/:id', updateTicket);
//delete ticket
router.delete('/:id', deleteTicket);
// Assign a ticket
router.patch('/:id/assign', assignToTicket);
// Move ticket status
router.patch('/:id/status',moveTicketStatus);
module.exports = router;