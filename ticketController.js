const ticketService = require('../services/ticketService');
const createTicket = async (req, res) => {
    try {

        const { title, description, assign_to } = req.body;
        assign_to !== undefined ? assign_to : null
        const data = await ticketService.createTicket(title, description, assign_to);
            res.status(200).json(data);
    } catch(error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};
const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets(req, res);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTicketById = async (req, res) => {
    try {
        const {id} = req.params
        const tickets = await ticketService.getTicketById(id, res);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateTicket = async (req, res) => {
    try {
        const tickets = await ticketService.updateTicket(req, res);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteTicket = async (req, res) => {
    try {
        const {id} = req.params;
        const tickets = await ticketService.deleteTicket(id, res);        
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//assignToTicket
const assignToTicket = async (req, res) => {
    try {

        const tickets = await ticketService.assignToTicket(req, res);        
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//moveTicketStatus
const moveTicketStatus = async (req, res) => {
    try {

        const tickets = await ticketService.moveTicketStatus(req, res);        
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, assignToTicket, moveTicketStatus};
