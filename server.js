require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const Tattoo = require('./models/tattoo');

//-----------------------------
// Database
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

//-----------------------------
// Error messagae
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected'));
db.on('disconnected', () => console.log('mongod disconnected'));
//-----------------------------
// Middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

//-----------------------------
// Routes
//-----------------------------
app.get('/', (req, res) => {
    res.send('Hello World');
});
//-----------------------------
// Index
app.get('/tattoos', (req, res) => {
    res.send('I work')
})

//-----------------------------
// New
app.get('/tattoos/new', (req, res) => {
    res.render('new.ejs')
})

//-----------------------------
// Delete


//-----------------------------
// Update


//-----------------------------
// Create


//-----------------------------
// Edit


//-----------------------------
// Show




app.listen(PORT, ()=> console.log(`Listen on port ${PORT}`));