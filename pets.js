const fs = require('fs');

const subcommand = process.argv[2];

switch (subcommand){
    case 'read': 
        fs.readFile("./pets.json", 'utf8', (err, data) => {
            if (err) throw err;
            
            const index = process.argv[3];
            const parsedData = JSON.parse(data);
            if (index === undefined){
                console.log(parsedData)
            } else if (Number(index) >= 0 && Number(index) < parsedData.length){
                console.log(parsedData[index]);
            } else {
                console.error(`the index of ${index} does not exist`);
                process.exit(1);
            }
        });
        break;
    case 'create':
        fs.readFile('./pets.json', 'utf8', (err, data) => {
            if (err) throw err;
            
            const parsedData = JSON.parse(data)
            const age = process.argv[3];
            const kind = process.argv[4];
            const name = process.argv[5];

            if (Number.isNaN(age) || !kind || !name){
                console.err('usage age name kind');
                process.exit(1);
            }
            
            console.log(JSON.stringify(parsedData));
            // const newData = (parsedData);
            const pet = { age, kind, name };
            parsedData.push(pet);
            const petsJSON = JSON.stringify(parsedData);
            

            // newData = newData.push(`{age: ${Number.age}, kind: ${kind}, name: ${name}}`);
            // console.log(newData);

            fs.writeFile('./pets.json', petsJSON, (err) => {
                if(err) throw err;
                
                console.log(pet)
            });
        });
        break;
    case 'update':

        break;
    case 'destroy': 

        break;
    default:
        console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit[1];

}
