let express = require("express");
let path = require('path');
let app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo', {useNewUrlParser: true});
const {elephantModel} = require('./models/elephantModel')

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    elephantModel
    .findAll()
    .then(data => res.render("results", {elephants: data}))
    .catch(err => console.log(err))
})

app.get('/elephants/new', function(req, res){
    res.render("form");
})
app.post('/elephants', function(req, res) {
    let elephant = {}
    elephant.name = req.body.name;
    elephant.age = req.body.age;
    elephant.type = req.body.type;
    elephantModel
    .create(elephant)
    .then(newElephant => console.log('Elephant created: ', newElephant))
    .catch(err => console.log(err))
    res.redirect('/')
})

app.get("/elephants/:id", function(req, res){
    elephantModel
    .findById(req.params.id)
    .then(data => res.render("display", {elephant:data}))
    .catch(err => res.json(err));
})

app.get("/elephants/edit/:id", function(req, res){
    elephantModel
    .findById(req.params.id)
    .then(data => res.render("edit", {elephant:data}))
    .catch(err => res.json(err));
})

app.post("/elephants/edit", function(req, res) {
    console.log(req.body)
    let elephant = {}
    elephant.name = req.body.name;
    elephant.age = req.body.age;
    elephant.type = req.body.type;

    elephantModel
    .update(req.body.id, elephant)
    .then(newElephant => console.log(`Elephant ${request.body.id} edited: `, newElephant))
    .catch(err => console.log(err))
    res.redirect('/')
})

app.post("/elephants/destroy", function(req, res){
    console.log(req.body)

    elephantModel
    .delete(req.body.id)
    .then(console.log(`Deleting elephant ${req.body.id}`))
    .catch(err => res.json(err));

    res.redirect('/')
})

// tell the express app to listen on port 8000
app.listen(8085, function() {
 console.log("listening on port 8085");
});
