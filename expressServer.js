const express = require('express');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');


app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf8', (err,data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.get('/pets/:index', (req, res) => {
    fs.readFile('./pets.json', 'utf8', (err,data) => {
        if (err) throw err;

        const parsedData = JSON.parse(data)
        const index = req.params.index;

        if (index >= parsedData.length || index < 0){
            res.statusCode = 404
            res.send('Index not found');
            return
        }

        res.send((parsedData[index]))
    })
})

app.listen(8090);