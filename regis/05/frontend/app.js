const API_URL = "http://localhost:3000/api/tasks";

function fetchTasks() {
    fetch(API_URL, {
        headers: { 'x-api-key': '123456' }
    })
        .then(res => res.json())
        .then(tasks => {
            const tbody = document.querySelector('#tasksTable tbody');
            tbody.innerHTML = '';
            tasks.forEach(task => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>
                        <button onclick="deleteTask(${task.id})">Excluir</button>
                        <button class="edit" onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Editar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function addTask(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': '123456' },
        body: JSON.stringify({ title, description })
    })
    .then(() => {
        document.getElementById('taskForm').reset();
        fetchTasks();
    });
}

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': '123456' }
    })
        .then(() => fetchTasks());
}

function editTask(id, oldTitle, oldDescription) {
    const title = prompt('Novo título:', oldTitle);
    const description = prompt('Nova descrição:', oldDescription);
    if (title && description) {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-api-key': '123456' },
            body: JSON.stringify({ title, description })
        })
        .then(() => fetchTasks());
    }
}

document.getElementById('taskForm').addEventListener('submit', addTask);
window.onload = fetchTasks;
