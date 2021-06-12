const express = require('express');
const tattooRouter = express.Router();
const Tattoo = require('../models/tattoo');


// Seed
const tattooSeed = require('../models/tattooSeed');

tattooRouter.get('/seed', (req, res) => {
    Tattoo.deleteMany({}, (error, allTattoos) => {});
    Tattoo.create(tattooSeed, (error, data) => {
        res.redirect('/tattoos');
    });
});
//-----------------------------
// Routes
//-----------------------------
// Index

tattooRouter.get('/', (req, res) => {
    Tattoo.find({}, (error, allTattoos) => {
        res.render('index.ejs', {
            tattoos: allTattoos,
        });
    });
});

//-----------------------------
// New
tattooRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})

//-----------------------------
// Delete
tattooRouter.delete('/:id', (req, res) => {
    Tattoo.findByIdAndDelete(req.params.id, (error, deletedTattoo) => {
        res.redirect('/tattoos');
    });
});

//-----------------------------
// Update
tattooRouter.put('/:id', (req, res) => {
    Tattoo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updateTattoo) => {
        res.redirect(`/tattoos/${req.params.id}`);
    });
});


//-----------------------------
// Create
tattooRouter.post('/', (req, res) => {
    Tattoo.create(req.body, (error, createdTattoo) => {
        res.redirect('/tattoos');
    });
});

//-----------------------------
// Edit
tattooRouter.get('/:id/edit', (req, res) => {
    Tattoo.findById(req.params.id, (error, foundTattoo) => {
        res.render('edit.ejs', {
            tattoo: foundTattoo,
        })
    })
})


//-----------------------------
//Show
tattooRouter.get('/:id', (req, res) => {
    Tattoo.findById(req.params.id, (err, foundTattoo) => {
        res.render('show.ejs', { 
            tattoo: foundTattoo,
        });
    });
});



module.exports = tattooRouter;