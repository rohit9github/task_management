const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getUsers = async (req, res) => {
    console.log('GET /users called');
    if (req.user.role !== 'Admin') return res.status(403).send('Access denied.');

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const assignRole = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access denied.');

    try {
        const { userId, role } = req.body;
        await User.findByIdAndUpdate(userId, { role });
        res.send('Role assigned');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { register, login, getUsers, assignRole };
