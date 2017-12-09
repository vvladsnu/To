const express = require('express');
const bodyParser = require('body-parser');
const routerTodo = require('./routes/todo');

const app = express();

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('result', routerTodo);

app.use((req, res, next) => {
  res.status(404).send('404');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('500');
})

app.listen(3000, function() {
  console.log('Server running. Use our API');
})