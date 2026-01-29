const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const requireApiKey = require('../middlewares/requireApiKey');

// Middleware para todas as rotas de tasks
router.use(requireApiKey);

router.get('/', tasksController.listTasks);
router.post('/', tasksController.createTask);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
