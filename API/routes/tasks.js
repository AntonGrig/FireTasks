const db = require('../db');
const Router = require('express-promise-router')
const router = new Router();

router.get('/get-todo-list', async (_req, res) => {
  const { rows } = await db.query('SELECT id, name FROM tasks');
  res.json(rows);
})

router.get('/get-todo-item/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.json({ error: "No id specified" });
  }

  const { rows } = await db.query('SELECT id, name FROM tasks WHERE id = $1', [id]);
  res.json(rows);
})

// Add new task
router.post('/add-todo', async (req, res) => {
  var name = req.body.name;
  if (!name) {
    res.json({ error: "No name specified" });
  }

  const { rows } = await db.query('INSERT INTO tasks (name) VALUES ($1) RETURNING id', [name]);
  res.json({ message: `Successfully added an item with ID ${rows[0].id}`});

  // Transactional Way:
  /*
    db.getClient(async (err, client, done) => {
      const { rows } = await client.query('INSERT INTO tasks (name) VALUES ($1) RETURNING id', [name]);
      await client.query('COMMIT');
      done();
      res.json({ message: `Successfully added an item with ID ${rows[0].id}`})
    });
  */
});

router.delete('/delete-todo/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.json({ error: "No id specified" });
  }

  console.log(`deleting with id`, id);
  
  await db.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: `Successfully deleted an item with ID ${id}`});
});

// Add update-todo
router.put('/update-todo/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  if (!id) {
    res.json({ error: "No id specified" });
  }
  if (!name) {
    res.json({ error: "No name specified" });
  }

  await db.query('UPDATE tasks SET name = $1 WHERE id = $2', [name, id]);
  res.json({ message: `Successfully updated an item with ID ${id} and new name ${name}`});
});

module.exports = router;