require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const Tattoo = require('./models/tattoo');

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
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Seed
const tattooSeed = require('./models/tattooSeed');

app.get('/tattoos/seed', (req, res) => {
    Tattoo.deleteMany({}, (error, allTattoos) => {});
    Tattoo.create(tattooSeed, (error, data) => {
        res.redirect('/tattoos');
    });
});
//-----------------------------
// Routes
//-----------------------------
// Index

app.get('/tattoos', (req, res) => {
    Tattoo.find({}, (error, allTattoos) => {
        res.render('index.ejs', {
            tattoos: allTattoos,
        });
    });
});

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
app.post('/tattoos', (req, res) => {
    Tattoo.create(req.body, (error, createdTattoo) => {
        res.redirect('/tattoos');
    });
});

//-----------------------------
// Edit


//-----------------------------
//Show
app.get('/tattoos/:id', (req, res) => {
    Tattoo.findById(req.params.id, (err, foundTattoo) => {
        res.render('show.ejs', { 
            tattoo: foundTattoo,
        });
    });
});



app.listen(PORT, ()=> console.log(`Listen on port ${PORT}`));