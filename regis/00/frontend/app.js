// Botão de verificar conexão com o banco
const checkDbBtn = document.getElementById('checkDb');
if (checkDbBtn) {
  checkDbBtn.addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Verificando conexão com o banco...';
    try {
      // Usa o mesmo endpoint /health por enquanto, pode ser trocado por /db se backend implementar
      const response = await fetch('http://localhost:3000/health');
      if (!response.ok) throw new Error('Erro na requisição');
      const data = await response.json();
      resultDiv.textContent = `conexão: '${data.status}'`;
    } catch (err) {
      resultDiv.textContent = 'Erro ao conectar com o banco';
    }
  });
}
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
  <input type="date" id="taskDate" placeholder="Data" class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
  <select id="taskPriority" class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
    <option value="normal">Normal</option>
    <option value="alta">Alta</option>
    <option value="baixa">Baixa</option>
  </select>
  <select id="taskStage" class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
    <option value="todo">A Fazer</option>
    <option value="doing">Fazendo</option>
    <option value="done">Feito</option>
  </select>
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
      tasksDiv.innerHTML = '<ul class="divide-y divide-gray-200">' + data.data.map(task => `
        <li class="py-2">
          <div class="font-bold text-blue-800">${task.title}</div>
          <div class="text-gray-700 text-xs">${task.description || ''}</div>
          <div class="flex flex-wrap gap-2 mt-1 text-xs">
            ${task.date ? `<span class="bg-gray-200 rounded px-2">Data: ${new Date(task.date).toLocaleDateString()}</span>` : ''}
            ${task.priority ? `<span class="bg-yellow-100 rounded px-2">Prioridade: ${task.priority}</span>` : ''}
            ${task.stage ? `<span class="bg-green-100 rounded px-2">Etapa: ${task.stage}</span>` : ''}
            ${task.isTrashed ? `<span class="bg-red-200 rounded px-2">Lixeira</span>` : ''}
          </div>
          ${Array.isArray(task.activities) && task.activities.length > 0 ? `<div class="mt-1"><b>Atividades:</b><ul class="list-disc ml-4">${task.activities.map(a => `<li>${a.activity} <span class='text-gray-400'>(${a.type})</span></li>`).join('')}</ul></div>` : ''}
        </li>
      `).join('') + '</ul>';
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
  const date = form.querySelector('#taskDate').value;
  const priority = form.querySelector('#taskPriority').value;
  const stage = form.querySelector('#taskStage').value;
  if (!title) return;
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, date, priority, stage })
    });
    if (!response.ok) throw new Error('Erro ao incluir tarefa');
    form.reset();
    listarTasks();
  } catch (err) {
    alert('Erro ao incluir tarefa!');
  }
});
