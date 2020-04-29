const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticator = require('../auth/authenticator');
const authRouter = require('../auth/auth-router');
//recipe router...

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
//use recipe router...

server.get('/', (req, res) => {
    res.json({ api: 'up & running' })
});

module.exports = server;