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

// Nova funcionalidade: listar tasks
const tasksContainer = document.getElementById('tasksContainer');
const listBtn = document.createElement('button');
listBtn.textContent = 'Listar Tasks';
listBtn.className = 'px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition';
const tasksDiv = document.createElement('div');
tasksDiv.id = 'tasksList';
tasksDiv.className = 'w-full';
tasksContainer.appendChild(listBtn);
tasksContainer.appendChild(tasksDiv);

listBtn.addEventListener('click', async () => {
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
});
