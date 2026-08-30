const STORAGE_KEY = 'taskflow-tasks';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (err) {
    console.warn('localStorage unavailable, using in-memory storage only.', err);
    return [];
  }
}

let tasks = loadTasks();
let currentFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Could not persist tasks to localStorage.', err);
  }
}

function render() {
  taskList.innerHTML = '';

  const filtered = tasks.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    taskList.innerHTML = '<li class="empty-state">No tasks here 🎉</li>';
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="delete-btn" data-id="${task.id}">✕</button>
    `;
    taskList.appendChild(li);
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    text,
    priority: prioritySelect.value,
    completed: false
  });

  taskInput.value = '';
  taskInput.focus();
  save();
  render();
});

taskList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.matches('input[type="checkbox"]')) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    save();
    render();
  }

  if (e.target.matches('.delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();