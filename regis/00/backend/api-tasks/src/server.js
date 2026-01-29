const express = require('express');

const tasks = [
  { id: 't1', title: 'Configurar Projeto', description: 'Inicializar repositório e instalar dependências', done: false, createdAt: new Date().toISOString() },
  { id: 't2', title: 'Modelagem de Dados', description: 'Definir esquemas do banco de dados para a clínica', done: false, createdAt: new Date().toISOString() },
  { id: 't3', title: 'Integração Firebase', description: 'Conectar a aplicação ao Firestore', done: false, createdAt: new Date().toISOString() },
  { id: 't4', title: 'Layout da Home', description: 'Desenvolver a interface principal em React', done: false, createdAt: new Date().toISOString() },
  { id: 't5', title: 'Sistema de Auth', description: 'Implementar login social com GitHub', done: false, createdAt: new Date().toISOString() },
  { id: 't6', title: 'Prontuário Digital', description: 'Criar formulário de anamnese para odontologia', done: false, createdAt: new Date().toISOString() },
  { id: 't7', title: 'Componente de Agenda', description: 'Desenvolver calendário de marcação de consultas', done: false, createdAt: new Date().toISOString() },
  { id: 't8', title: 'Validação de Campos', description: 'Adicionar Zod para validar entradas de usuários', done: false, createdAt: new Date().toISOString() },
  { id: 't9', title: 'Testes Unitários', description: 'Escrever testes para os hooks personalizados', done: false, createdAt: new Date().toISOString() },
  { id: 't10', title: 'Otimização de Imagens', description: 'Configurar compressão automática de uploads', done: false, createdAt: new Date().toISOString() },
  { id: 't11', title: 'Documentação Técnica', description: 'Escrever o README e documentar a API', done: false, createdAt: new Date().toISOString() },
  { id: 't12', title: 'Refatoração de CSS', description: 'Migrar estilos inline para Tailwind CSS', done: false, createdAt: new Date().toISOString() },
  { id: 't13', title: 'Deploy Staging', description: 'Subir versão de teste para o Vercel', done: false, createdAt: new Date().toISOString() },
  { id: 't14', title: 'Revisão de Código', description: 'Analisar PRs pendentes da equipe', done: false, createdAt: new Date().toISOString() },
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

  const { title, done = false } = req.body;



  if (!title || typeof title !== 'string') {

    return res.status(400).json({

      error: 'VALIDATION_ERROR',

      message: "Campo 'title' é obrigatório e deve ser string"

    });

  }



  const task = {

    id: `t${counter++}`,

    title: title.trim(),

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