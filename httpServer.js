const http = require('http');
const fs = require('fs');
const port = 9000;

// const index = petRegExp[1];

const server =  http.createServer((req, res) => {
    const petRegExp = req.url.match(/^\/pets\/(.*)$/);
    
    if (req.method === 'GET' && req.url === '/pets'){
        fs.readFile('./pets.json', 'utf8', (err, data) => {
            if (err) throw err;
            
            console.log(data)
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(data);
            
        })
        return;
    }
    
    let index = petRegExp[1];
    if (req.method === 'GET' && req.url === `/pets/${index}`){
        fs.readFile('./pets.json', 'utf8', (err, data) => {
            if (err) throw err;
            
        const parsedData = JSON.parse(data);

        if (index > parsedData.length || index < 0){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Index not found');
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(parsedData[index]));
        })
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
})


server.listen(9000);