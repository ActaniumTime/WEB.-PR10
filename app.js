
const express = require('express');

const hbs = require("hbs");
const app = express();

const path = require('path');

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static(__dirname));
app.use(express.json());


app.get('/', (_, response) => {
    response.render(path.join(__dirname, 'index')); 
});

 

const animals = [];
let id = 1;     
 

function findanimalIndexById(id){
    for(let i=0; i < animals.length; i++){
        if(animals[i].id==id) return i;
    }
    return -1;
}
app.get("/api/animals", function(_, res){
        
    res.send(animals);
});

app.get("/api/animals/:id", function(req, res){
        
    const id = req.params.id; 
    
    const index = findanimalIndexById(id);
    
    if(index > -1){
        res.send(animals[index]);
    }
    else{
        res.status(404).send("animal not found");
    }
});

app.post("/api/animals", function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const animalName = req.body.name;
    const animalAge = req.body.age;
    const animalType = req.body.type;
    const animalHealth = req.body.health;
    const amimalWeigth = req.body.weight;

    const animal = {name: animalName, age: animalAge, type: animalType, health: animalHealth, weight: amimalWeigth};
    
    animal.id = id++;
    
    animals.push(animal);
    res.send(animal);
});
 
app.delete("/api/animals/:id", function(req, res){
        
    const id = req.params.id;
    const index = findanimalIndexById(id);
    if(index > -1){
        
        const animal = animals.splice(index, 1)[0];
        res.send(animal);
    }
    else{
        res.status(404).send("animal not found");
    }
});

app.put("/api/animals", function(req, res){
        
    if(!req.body) return res.sendStatus(400);
       
    const id = req.body.id;
    const animalName = req.body.name;
    const animalAge = req.body.age;
    const animalType = req.body.type;
    const animalHealth = req.body.health;
    const amimalWeigth = req.body.weight;

    const index = findanimalIndexById(id);
    if(index > -1){
        
        const animal = animals[index];
        animal.age = animalAge;
        animal.name = animalName;
        animal.type =   animalType;
        animal.health = animalHealth;
        animal.weight = amimalWeigth;
        res.send(animal);
    }
    else{
        res.status(404).send("animal not found");
    }
});
    
app.listen(3000, function(){
    console.log("localhost:3000");
});