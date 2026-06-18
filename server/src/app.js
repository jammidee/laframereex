const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', message: 'Express backend is running smoothly.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});