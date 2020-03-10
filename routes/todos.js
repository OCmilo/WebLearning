var express = require('express'),
    router = express.Router();
var db = require('../models');


router.get('/', function (request, response) {
    db.Todo.find()
        .then(function (todos) {
            response.status(201).json(todos)
        })
        .catch(function (err) {
            response.send(err);
        })
});


router.post('/', function (request, response) {
    db.Todo.create(request.body)
        .then(function (newTodo) {
            response.json(newTodo);
        })
        .catch(function (err) {
            response.send(err);
        })
});


router.get('/:todoID', function (request, response) {
    var id = request.params.todoID;
    db.Todo.findById(id)
        .then(function (todoS) {
            response.json(todoS);
        })
        .catch(function (err) {
            response.send(err);
        })
});


router.put('/:todoID', function (request, response) {
    var id = request.params.todoID;
    db.Todo.findOneAndUpdate({ _id: request.params.todoID }, request.body, { new: true })
        .then(function (todoS) {
            response.json(todoS);
        })
        .catch(function (err) {
            response.send(err);
        })
});


router.delete('/:todoID', function (request, response) {
    var id = request.params.todoID;
    db.Todo.remove({ _id: request.params.todoID })
        .then(function (todoS) {
            response.json('Item succesfully deleted');
        })
        .catch(function (err) {
            response.send(err);
        })
});

module.exports = router;