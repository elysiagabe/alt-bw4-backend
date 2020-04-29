const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//auth middleware
//auth router
//recipe router...

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//use auth router
//use recipe router...

server.get('/', (req, res) => {
    res.json({ api: 'up & running' })
});

module.exports = server;