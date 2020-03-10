var express = require('express'),
    app = express(),
    PORT = '3000',
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))


app.get('/', function (request, response) {
    response.sendFile("index.html")
})


app.use('/api/todos', todoRoutes);


app.listen(PORT, function () {
    console.log('APP IS RUNNING ON PORT ' + PORT)
})

