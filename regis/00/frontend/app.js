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
const listBtn = document.createElement('button');
listBtn.textContent = 'Listar Tasks';
document.querySelector('.container').appendChild(listBtn);

const tasksDiv = document.createElement('div');
tasksDiv.id = 'tasksList';
document.querySelector('.container').appendChild(tasksDiv);

listBtn.addEventListener('click', async () => {
  tasksDiv.textContent = 'Carregando...';
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    if (Array.isArray(data.data) && data.data.length > 0) {
      tasksDiv.innerHTML = '<ul>' + data.data.map(task => `<li><b>${task.title}</b>: ${task.description || ''}</li>`).join('') + '</ul>';
    } else {
      tasksDiv.textContent = 'Nenhuma task encontrada.';
    }
  } catch (err) {
    tasksDiv.textContent = 'Erro ao buscar tasks.';
  }
});
