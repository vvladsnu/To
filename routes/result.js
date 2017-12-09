const express = require('express');
const router = express.Router();
const ctrlTodo = require('../controllers/todo');

router.get('/', ctrlTodo.getUsers);

router.get('/:id', ctrlTodo.getUser);

router.post('/', ctrlTodo.addToDo);

router.put('/:id', ctrlTodo.editToDo);

router.delete('/:id', ctrlTodo.deleteToDo);

module.exports = router;