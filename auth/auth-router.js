const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');
const secrets = require('../api/secrets');

// POST request to register new user
router.post('/register', (req, res) => {
    let acctInfo = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(acctInfo.password, rounds);
    acctInfo.password = hash;

    Users.add(acctInfo)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Error registering new user: ${err.message}` })
        })
});

// POST request to login existing user
router.post('/login', (req, res) => {
    let { email, password } = req.body;

    Users.findBy({ email })
        .then(user => {
            if(user && bcrypt.compareSync(password, user[0].password)) {
                const token = generateToken(user[0]);
                res.json({ message: "User authenticated successfully", token })
            } else {
                res.status(404).json({ message: 'User account not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Error logging user in: ${err.message}` })
        })
})

function generateToken(user) {
    const payload = {
        userId: user.id
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options)
}

module.exports = router;