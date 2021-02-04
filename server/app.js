const express = require('express');
const app = express();
const UserController = require('./controllers/UserController')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/users/register', UserController.register)
app.post('/users/login', UserController.login)

app.listen(port);