const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users');
});

router.get('/new', (req, res) => {
    res.render('users/new');
});

router.post('/', (req, res) => {
    console.log(req.body.firstName);
    res.send("Hi");
});

router.route('/:id')
    .get((req, res) => { 
        res.send(`Get user with the ID ${req.params.id}`)
    })
    .post((req, res) => { 
        const isValid = true;
        if (isValid) {
            users.push({firstName: req.body.firstName});
            response.redirect(`/users/${users.length - 1}`);
        }
        else {
            console.log('Error');
            res.render('users/new', { firstName: req.body.firstName});
        }
        res.send(`Update user with the ID ${req.params.id}`)
    })
    .delete((req, res) => { 
        res.send(`Delete user with the ID ${req.params.id}`)
    });

const users = [{name : 'Kyle'}, {name : 'Sally'}];

router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next();
});

module.exports = router;