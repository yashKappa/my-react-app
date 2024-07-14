import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Load tasks and completed tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks and completed tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(''); // Clear input after adding
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleCompleteTask = (index) => {
    const completedTask = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, { ...completedTask, completed: true }]);
  };

  const handleRemoveCompletedTask = (index) => {
    const newCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className="todo-container">
      <div className="button-container">
        <button 
          className={`toggle-button ${!showCompleted ? 'active' : ''}`} 
          onClick={() => setShowCompleted(false)}
        >
          All Tasks
        </button>
        <button 
          className={`toggle-button ${showCompleted ? 'active' : ''}`} 
          onClick={() => setShowCompleted(true)}
        >
          Completed Tasks
        </button>
      </div>
      <div className='task-sections'>
        {!showCompleted && (
          <div className='task'>
            <h1>Your All Tasks</h1>
            <ul className='sub-task'>
              {tasks.map((task, index) => (
                <li key={index} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                  <label>{task.text}</label>
                  <div>
                    <button className="todo-complete-button" onClick={() => handleCompleteTask(index)}>Complete</button>
                    <button className="todo-remove-button" onClick={() => handleRemoveTask(index)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {showCompleted && (
          <div className='task'>
            <h1>Your Completed Tasks</h1>
            <ul className='sub-task'>
              {completedTasks.map((task, index) => (
                <li key={index} className="todo-item completed">
                  <span>{task.text}</span>
                  <button className="todo-remove-button" onClick={() => handleRemoveCompletedTask(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="content">
        <section className="section" id="tasks">
          <div className="todo-input-container">
            <input
              className="todo-input"
              type="text"
              value={task}
              onChange={handleInputChange}
              placeholder="Enter a new task"
            />
            <button className="todo-button" onClick={handleAddTask}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_Death_Note.jpg/1200px-Logo_Death_Note.jpg' alt="Add Task" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TodoList;
