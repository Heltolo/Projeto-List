
document.getElementById('addTaskBtn').addEventListener('click', function () {
  const taskInput = document.getElementById('taskInput');
  const categorySelect = document.getElementById('categorySelect');
  const taskList = document.getElementById('taskList');


  if (taskInput.value.trim() === '') {
      alert('Por favor, insira uma tarefa!');
      return;
  }

  
  const li = document.createElement('li');
  li.innerHTML = `
      <span>${taskInput.value} (${categorySelect.value})</span>
      <div class="task-actions">
          <button class="complete-btn"><i class="fas fa-check"></i></button>
          <button class="delete-btn"><i class="fas fa-trash"></i></button>
      </div>
  `;


  taskList.appendChild(li);
  taskInput.value = ''; // 

  
  li.querySelector('.complete-btn').addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks(); 
  });

  
  li.querySelector('.delete-btn').addEventListener('click', function () {
      li.remove();
      saveTasks(); 
  });

  saveTasks(); 
});


function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
      tasks.push({
          text: li.querySelector('span').textContent,
          completed: li.classList.contains('completed')
      });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${task.text}</span>
          <div class="task-actions">
              <button class="complete-btn"><i class="fas fa-check"></i></button>
              <button class="delete-btn"><i class="fas fa-trash"></i></button>
          </div>
      `;
      if (task.completed) li.classList.add('completed');
      document.getElementById('taskList').appendChild(li);

     
      li.querySelector('.complete-btn').addEventListener('click', function () {
          li.classList.toggle('completed');
          saveTasks();
      });

      li.querySelector('.delete-btn').addEventListener('click', function () {
          li.remove();
          saveTasks();
      });
  });
}


loadTasks();