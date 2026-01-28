// Handlers para as rotas de tasks

exports.listTasks = (req, res) => {
  res.json({ message: 'Listando todas as tasks' });
};

exports.createTask = (req, res) => {
  res.json({ message: 'Criando uma nova task' });
};

exports.getTaskById = (req, res) => {
  res.json({ message: `Buscando task com id ${req.params.id}` });
};

exports.updateTask = (req, res) => {
  res.json({ message: `Atualizando task com id ${req.params.id}` });
};

exports.deleteTask = (req, res) => {
  res.json({ message: `Deletando task com id ${req.params.id}` });
};
