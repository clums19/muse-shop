require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const tattooRouter = require('./controllers/tattoos');
const app = express();
const PORT = process.env.PORT || 3000;

//-----------------------------
// Database
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

//-----------------------------
// Error messagae
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected'));
db.on('disconnected', () => console.log('mongod disconnected'));
//-----------------------------
// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
const tattooController = require('./controllers/tattoos');
app.use('/tattoos', tattooController);



app.listen(PORT, ()=> console.log(`Listen on port ${PORT}`));