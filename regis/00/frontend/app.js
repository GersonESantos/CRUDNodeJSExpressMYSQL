
// Botão de status health
document.getElementById('checkHealth').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<span class="animate-pulse text-blue-500">Verificando...</span>';
  try {
    const response = await fetch('http://localhost:3000/health');
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    resultDiv.innerHTML = `<span class="font-bold text-green-600">status: '${data.status}'</span>`;
  } catch (err) {
    resultDiv.innerHTML = '<span class="text-red-500">Erro ao conectar com a API</span>';
  }
});

// Botão de listar tasks
const listBtn = document.getElementById('listTasks');
const tasksDiv = document.getElementById('tasksList');

listBtn.addEventListener('click', async () => {
  tasksDiv.innerHTML = '<span class="animate-pulse text-blue-500">Carregando...</span>';
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    if (Array.isArray(data.data) && data.data.length > 0) {
      tasksDiv.innerHTML = `<ul class="divide-y divide-gray-200">` +
        data.data.map(task =>
          `<li class="py-2 flex flex-col text-left">
            <span class="font-semibold text-indigo-700">${task.title}</span>
            <span class="text-gray-600 text-sm">${task.description || ''}</span>
          </li>`
        ).join('') + '</ul>';
    } else {
      tasksDiv.innerHTML = '<span class="text-gray-500">Nenhuma task encontrada.</span>';
    }
  } catch (err) {
    tasksDiv.innerHTML = '<span class="text-red-500">Erro ao buscar tasks.</span>';
  }
});
