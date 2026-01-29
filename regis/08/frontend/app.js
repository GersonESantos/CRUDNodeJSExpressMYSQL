document.getElementById('checkHealth').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Verificando...';
  try {
    const response = await fetch('http://localhost:3000/health');
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    resultDiv.textContent = `status: '${data.status}'`;
  } catch (err) {
    resultDiv.textContent = 'Erro ao conectar com a API';
  }
});

// Nova funcionalidade: incluir e listar tasks
const tasksContainer = document.getElementById('tasksContainer');

// Formulário de inclusão de tarefa
const form = document.createElement('form');
form.className = 'w-full flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow';
form.innerHTML = `
  <input type="text" id="taskTitle" placeholder="Título da tarefa" required class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
  <input type="text" id="taskDesc" placeholder="Descrição (opcional)" class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
  <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Incluir Tarefa</button>
`;
tasksContainer.appendChild(form);

const listBtn = document.createElement('button');
listBtn.textContent = 'Listar Tasks';
listBtn.className = 'px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition';
tasksContainer.appendChild(listBtn);

const tasksDiv = document.createElement('div');
tasksDiv.id = 'tasksList';
tasksDiv.className = 'w-full';
tasksContainer.appendChild(tasksDiv);

// Função para listar tasks
async function listarTasks() {
  tasksDiv.textContent = 'Carregando...';
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    if (Array.isArray(data.data) && data.data.length > 0) {
      tasksDiv.innerHTML = '<ul class="divide-y divide-gray-200">' + data.data.map(task => `<li class="py-2"><span class="font-bold text-blue-800">${task.title}</span>: <span class="text-gray-700">${task.description || ''}</span></li>`).join('') + '</ul>';
    } else {
      tasksDiv.textContent = 'Nenhuma task encontrada.';
    }
  } catch (err) {
    tasksDiv.textContent = 'Erro ao buscar tasks.';
  }
}

listBtn.addEventListener('click', listarTasks);

// Submissão do formulário para incluir tarefa
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = form.querySelector('#taskTitle').value.trim();
  const description = form.querySelector('#taskDesc').value.trim();
  if (!title) return;
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (!response.ok) throw new Error('Erro ao incluir tarefa');
    form.reset();
    listarTasks();
  } catch (err) {
    alert('Erro ao incluir tarefa!');
  }
});
