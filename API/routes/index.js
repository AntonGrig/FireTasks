var express = require('express');
var router = express.Router();
const fs = require('fs');

function readFromDatabase() {
  const json = fs.readFileSync('todo.json'); 
  return JSON.parse(json);
}

function writeToDatabase(database, message) {
  const data = JSON.stringify(database);
  fs.writeFile('todo.json', data, 'utf8', () => {
    res.json({ message });
  });
}

// GET home page
router.get('/', function (_req, res) {
  res.render('index', { title: 'Express' });
});

// Add new task
router.post('/add-todo', (req, res) => {
  const database = readFromDatabase();
  const id = database.counter;
  const name = req.body.name;

  database.todo.push({ id, name });
  database.counter++;
  
  writeToDatabase(database, "Data was added");
});

router.post('/delete-todo', (req, res) => {
  const database = readFromDatabase();
  const id = parseInt(req.body.id);

  const newArray = database.todo.filter((task) => task.id !== id);
  database.todo = newArray;

  writeToDatabase(database, "Data was deleted");
});

// Add update-todo
router.post('/update-todo', (req, res) => {
  const database = readFromDatabase();
  const id = parseInt(req.body.id);

  const newTask = database.todo.find((task) => task.id === id);
  newTask.name = req.body.name;

  writeToDatabase(database, "Data was updated");
});

module.exports = router;