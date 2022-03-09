const express = require('express');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
app.use(express.json());


//get request
app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf8', (err,data) => {
        if (err) throw err;
        res.send(data)
    })
})


//get request for certain index
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

//post request
app.post('/pets', (req, res) => {
    const pet = {};

    pet.age = req.body.age;
    pet.kind = req.body.kind;
    pet.name = req.body.name;

    fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        let parsedData = JSON.parse(data);
        parsedData.push(pet);

        fs.writeFile('./pets.json', JSON.stringify(parsedData), (err)=> {
            if (err) throw err;
        })
        res.json(parsedData);
    })
})


//patch request
app.patch('./pets/:index', (err, data) => {
    if (err) throw err;

    const index = req.params.index;

    fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        let patchData = req.body
        let parsedData = data[index];
        parsedData = {...parsedData, ...patchData};

        fs.writeFile('./pets.json', JSON.stringify(newData), (err)=> {
            if (err) throw err;
        });
        res.json(parsedData);
    });
});


//delete request



app.listen(8000);