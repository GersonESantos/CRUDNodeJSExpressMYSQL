
const connectToDb = require('./database/db');
connectToDb();
const express = require('express');


const app = express();

const cors = require('cors');


app.use(cors());

app.use(express.json());



app.get('/health', (req, res) => {

  res.status(200).json({ status: 'ok' });

});

const Task = require('./models/Task');

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(500).json({ error: 'DB_ERROR', message: 'Erro ao buscar tasks', details: err.message });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Task não encontrada' });
    }
    res.status(200).json({ data: task });
  } catch (err) {
    res.status(400).json({ error: 'INVALID_ID', message: 'ID inválido', details: err.message });
  }
});

app.post('/tasks', (req, res) => {
  const { title, description = '', done = false } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: "Campo 'title' é obrigatório e deve ser string"
    });
  }

  const Task = require('./models/Task');
  tasks.push(task);
  res.status(201).json({ data: task });
});

app.patch('/tasks/:id', (req, res) => {

  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {

    return res.status(404).json({ error: 'NOT_FOUND', message: 'Task não encontrada' });

  }



  const { title, done } = req.body;



  if (title !== undefined) {

    if (typeof title !== 'string' || !title.trim()) {

      return res.status(400).json({ error: 'VALIDATION_ERROR', message: "'title' deve ser string não vazia" });

    }

    task.title = title.trim();

  }



  if (done !== undefined) {

    if (typeof done !== 'boolean') {

      return res.status(400).json({ error: 'VALIDATION_ERROR', message: "'done' deve ser boolean" });

    }

    task.done = done;

  }



  res.status(200).json({ data: task });

});


app.delete('/tasks/:id', (req, res) => {

  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {

    return res.status(404).json({ error: 'NOT_FOUND', message: 'Task não encontrada' });

  }

  tasks.splice(index, 1);

  res.status(204).send();

});

app.listen(3000, () => console.log('API on http://localhost:3000'));