
const connectToDb = require('./database/db');
connectToDb();
const express = require('express');

const tasks = [
  { id: 't1', title: 'Configurar Projeto', description: 'Inicializar repositório e instalar dependências', done: false, createdAt: new Date().toISOString() },
  { id: 't2', title: 'Modelagem de Dados', description: 'Definir esquemas do banco de dados para a clínica', done: false, createdAt: new Date().toISOString() },
  { id: 't3', title: 'Integração Firebase', description: 'Conectar a aplicação ao Firestore', done: false, createdAt: new Date().toISOString() },
  { id: 't4', title: 'Layout da Home', description: 'Desenvolver a interface principal em React', done: false, createdAt: new Date().toISOString() },
  { id: 't15', title: 'Backup de Dados', description: 'Configurar rotina de exportação do MongoDB', done: false, createdAt: new Date().toISOString() }
];
let counter = 3;
const app = express();

const cors = require('cors');


app.use(cors());

app.use(express.json());



app.get('/health', (req, res) => {

  res.status(200).json({ status: 'ok' });

});

app.get('/tasks', (req, res) => {

  res.status(200).json({ data: tasks });

});

app.get('/tasks/:id', (req, res) => {

  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {

    return res.status(404).json({

      error: 'NOT_FOUND',

      message: 'Task não encontrada'

    });

  }

  res.status(200).json({ data: task });

});

app.post('/tasks', (req, res) => {
  const { title, description = '', done = false } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: "Campo 'title' é obrigatório e deve ser string"
    });
  }

  const task = {
    id: `t${counter++}`,
    title: title.trim(),
    description: description ? String(description).trim() : '',
    done: Boolean(done),
    createdAt: new Date().toISOString()
  };

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