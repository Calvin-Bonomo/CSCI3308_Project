const express = require('express');

module.exports = (database) => {
    const router = express.Router();

    // Route to handle user registration
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            console.error('Username or password is missing');
            return res.status(400).send('Username and password are required');
        }
        try {
            // Insert 
            const query = `
                INSERT INTO users (username, password)
                VALUES ($1, $2);
            `;
            
            await database.none(query, [username, password]);
            console.log(`User registered successfully: ${username}`);

            return res.redirect('/login');
        } catch (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('An error occurred during registration');
        }
    });

    return router;
};
