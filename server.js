// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
var characters = [
{
  route: 'picard',
  name: "Jean-Luc Picard",
  role: "Captain",
  ship: "USS Enterprise",
  hobby: 'Earl Grey Tea'
},
{
  route: 'riker',
  name: "William T. Riker",
  role: "First Officer",
  ship: 'USS Enterprise',
  hobby: 'trombone'
},
{
  route: 'geordi',
  name: 'Geordi La Forge',
  role: 'Lead Engineer',
  ship: 'USS Enterprise',
  hobby: 'holodeck'
},
{ 
  route: 'worf',
  name: 'Worf',
  role: 'Chief Security Officer',
  ship: 'USS Enterprise',
  hobby: 'Klingon politics' 
}
];

app.get("/", function(req, res) {
  res.send("Welcome to the Star Trek Page!");
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or shows "No character found"
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  var character = characters.find(c => c.route === chosen);
  res.json(character ? character : false);
  res.end();

});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  var newcharacter = req.body;

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
