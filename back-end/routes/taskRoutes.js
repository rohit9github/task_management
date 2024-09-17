const express = require('express');
const { createTask, updateTask, deleteTask, markTaskAsCompleted, getTasks, getAllTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.put('/:id/complete', authMiddleware, markTaskAsCompleted);
router.get('/', authMiddleware, getTasks);
router.get('/all', authMiddleware, getAllTasks); // Admin access

module.exports = router;
