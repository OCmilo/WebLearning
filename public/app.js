$(document).ready(function () {
    $.get('/api/todos')
        .then(addTodos)
        .catch(function (err) {
            console.log(err)
        })

    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    })

    $('.list').on('click', 'span', function (e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function () {
        updateTodo($(this));        
    });
});


function addTodos(todos) {
    // add todos to page
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}


function createTodo(todo) {
    var i = $('#todoInput').val().trim();
    $.post('api/todos', {
            name: i
        })
        .then(function (data) {
            addTodo(data);
            $('#todoInput').val('');
        })
        .catch(function (err) {
            console.log(err);
        })
}

function addTodo(todo) {
    var i = $('<li>' + todo.name + '<span>X</span>' + '</li>');
    i.data('id', todo._id);
    i.data('completed', todo.completed);
    i.addClass('task');

    if (todo.completed) {
        i.addClass('done');
    }

    $('.list').append(i);
}


function removeTodo(todo) {
    var i = todo.data('id');
    var url = '/api/todos/' + i;
    
    $.ajax({
            url: url,
            method: 'DELETE'
        })
        .then(function () {
            todo.remove();
        })
        .catch(function (err) {
            console.log(err);
        })
}


function updateTodo(todo) {
    var url = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var data = {completed: isDone}
    $.ajax({
        url: url,
        method: 'PUT',
        data: data
    })
    .then(function () {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
}