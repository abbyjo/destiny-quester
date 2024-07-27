require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const path = require('path');
const api = require('.routes/index.js');
const db = require('./config/connection');

const PORT = procecss.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server live and listening on port ${PORT}★`);
    });
});