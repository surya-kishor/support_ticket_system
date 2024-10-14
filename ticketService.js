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
        let newStatus = status;
        if (!newStatus) {
            newStatus = 'open'; 
        } else if (!validStatus.includes(newStatus)) {
            return res.status(400).send('Invalid status provided');
        }
        
        const {id} = req.params;
        const results = await db.execute('UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, newStatus, id]);
        
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
const assignToTicket = async (req, res) => {
    try {
        
        const ticketId = req.params.id;
        const { userId } = req.body;
        // Check if the user is valid
        if (!userId) {
            return ({error:'UserId is required'});
        }

        // Check if the user exists
        const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
            
            if (user[0].length === 0) {
                return ({error:'User not found'});
            }
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
        let newStatus = status;
        if (!newStatus) {
            newStatus = 'open'; 
        } else if (!validStatus.includes(newStatus)) {
            return res.status(400).send('Invalid status provided');
        }
        const query = 'UPDATE tickets SET status = ? WHERE id = ?';
        const results = await db.execute(query, [newStatus, ticketId]);

        return(results[0]);

    } catch(error) {
        console.log(error);
        return({ error: error.message });
    }

};


module.exports = {createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, assignToTicket, moveTicketStatus};
