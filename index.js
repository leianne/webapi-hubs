require('dotenv').config();
const express = require('express');
const db = require('./data/db');

const server = express();   

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/now', (req, res) => {
    res.send(`The date and time is ${Date.now().toISOString()}`)
})

server.get('/hubs', (req, res) => {
    const hub = req.body
    db.hubs
        .find(hub)
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message})
        })
})

server.delete('hubs/:id', (req, res) => {
    const hubId = req.params.id;

    db.hubs
        .remove(hubId)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(({code, message}) => {
            res.status(code).json({success: false, message: message})
        })
})
server.post('/hubs', (req, res) => {
    const hub = req.body
    db.hubs
        .add(hub)
        .then(hubs => {
            res.status(201).json({success: true, hub});
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message})
        })
})


const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log('Running Girrrrllll')
})

