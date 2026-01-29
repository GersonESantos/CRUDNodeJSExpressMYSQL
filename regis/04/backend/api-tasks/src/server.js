const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks.routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rotas de tasks
app.use('/tasks', tasksRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API de Tasks está rodando!' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});