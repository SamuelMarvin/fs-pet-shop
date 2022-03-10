const express = require('express');
const res = require('express/lib/response');
const app = express();
const fs = require('fs');
app.use(express.json());


const { Pool } = require('pg')

const pool = new Pool ({
    database: "petshop",
});

pool.query('SELECT * FROM pets;', (err, result) => {
    console.log(err, res)
    console.log(result.rows)
})

//get request
app.get('/pets', (req, res) => {
    pool.query('SELECT * FROM pets;', (err, result)=>{
        if (err) throw err;

        res.send(result.rows);
    })

    // fs.readFile('./pets.json', 'utf8', (err,data) => {
    //     if (err) throw err;
    //     res.send(data);
    // })
})


//get request for certain index
app.get('/pets/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM pets WHERE id=$1;`,[id], (err, result)=>{
        if (err) throw err;


        res.send(result.rows[0]);
    })
})

//post request
app.post('/pets', (req, res) => {
    const {age, name, kind} = req.body;
    pool.query('INSERT INTO pets(age, name, kind) VALUES($1, $2, $3) RETURNING *;',
    [age, name, kind], (err, result) =>{
        if (err) throw err;
        res.send(result.rows[0]);
    })
})



//patch request
app.patch('/pets/:id', (req, res) => {
    const {age, name, kind} = req.body;
    const id = req.params.id;
    const query = `
    UPDATE pets SET
        age = COALESCE($1, age),
        name = COALESCE($2, name),
        kind = COALESCE($3, kind)
    WHERE id = $4
    RETURNING *;`;
    pool.query(query, [age, name, kind, id]
    ).then((result) =>{
        res.send(result.rows);
    })
    .catch( (err) => {
        res.sendStatus(500);
    })
});


//delete request
app.delete('/pets/:id', (req,res)=>{
    const id = req.params.id;
    pool.query('DELETE FROM pets WHERE id=$1;',[id])
    .then((result)=> res.send('deleted'))
    .catch((err)=>{ console.log(err) 
    res.status(500)})
})



app.listen(8000);