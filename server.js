const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json()); 

// GET request for root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the API!</h1>');
});

// Middleware to validate options in request body
const validateOption = (req, res, next) => {
    const { option } = req.body;
    if (!option) {
        return res.status(400).send('Bad request: Missing option.');
    }
    next();
};

// PUT request for root route
app.put('/', validateOption, (req, res) => {
    const { option } = req.body;
    if (option === 'update') {
        res.send('Successfully updated the resource.');
    } else {
        res.status(400).send('Bad request: Invalid option.');
    }
});

// PATCH request for root route
app.patch('/', validateOption, (req, res) => {
    const { option } = req.body;
    if (option === 'update') {
        res.send('Successfully updated the resource.');
    } else {
        res.status(400).send('Bad request: Invalid option.');
    }
});

// POST request for root route
app.post('/', validateOption, (req, res) => {
    const { option } = req.body;
    if (option === 'posting') {
        res.status(201).send('Successfully created the resource.');
    } else {
        res.status(400).send('Bad request: Invalid option.');
    }
});

// DELETE request for root route
app.delete('/', validateOption, (req, res) => {
    const { option } = req.body;
    if (option === 'removal') {
        res.send('Successfully deleted the resource.');
    } else {
        res.status(400).send('Bad request: Invalid option.');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
