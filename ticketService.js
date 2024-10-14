const db = require('../config/db');
const validStatus = ['open', 'in_progress', 'closed'];
const createTicket = async (title, description, assign_to) => {
    try {
            assign_to !== undefined ? assign_to : null
            const data = await db.query('INSERT INTO tickets (title, description, assign_to) VALUES (?, ?, ?)', [title, description, assign_to]);
        
            return (data[0]);

    } catch(error) {

        console.log(error);
        return({ error: error.message });
    }
};
const getAllTickets = async ( ) => {
    try {
        const results = await db.execute('SELECT * FROM tickets where deleted = 0');

        return results[0];

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }
};
const getTicketById = async (id) => {
    try {
        const results = await db.execute('SELECT * FROM tickets where id = ?',[id]);

        return (results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};
const updateTicket = async (req) => {
    try {
        const { title, description, status} = req.body;

        //const validStatus = ['open', 'in_progress', 'closed'];

        if (!validStatus.includes(status)) {
            return({ error: "Invalid status provided" });
        }
        
        const {id} = req.params;
        const results = await db.execute('UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
        
        return (results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};
const deleteTicket = async (id, res) => {
    try {
        
        const results = await db.execute('UPDATE tickets SET deleted = 1 WHERE id = ?', [id]);        
        
        res.send (results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};
const assignToTicket = async (req) => {
    try {
        
        const ticketId = req.params.id;
        const { userId } = req.body;
        console.log(userId, ticketId);
        
        const query = 'UPDATE tickets SET assign_to = ? WHERE id = ?';
        const results = await db.execute(query, [userId, ticketId] );

        return(results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};
//moveTicketStatus
const moveTicketStatus = async (req) => {
    try {
        
        const ticketId = req.params.id;
        const { status } = req.body;
        if (!validStatus.includes(status)) {
            return({ error: "Invalid status provided" });
        }
        const query = 'UPDATE tickets SET status = ? WHERE id = ?';
        const results = await db.execute(query, [status, ticketId]);

        return(results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};


module.exports = {createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, assignToTicket, moveTicketStatus};
