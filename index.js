var express = require('express'),
    app = express(),
    PORT = '3000',
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    response.send("hi there.")
})


app.use('/api/todos', todoRoutes);


app.listen(PORT, function () {
    console.log('APP IS RUNNING ON PORT ' + PORT)
})

