const express = require('express');
const { register, getUsers, assignRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers); 
router.post('/assign-role', authMiddleware, assignRole);

module.exports = router;
