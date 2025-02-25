const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const ConnectTodatabase = require('./config/db-config');
ConnectTodatabase();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})