// src/CompletedTasks.js

import React from 'react';
import './CompletedTasks.css';

function CompletedTasks({ completedTasks, onRemoveCompletedTask }) {
  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      <ul className="completed-tasks-list">
        {completedTasks.map((task, index) => (
          <li key={index} className="completed-task-item">
            <span>{task.text}</span>
            <button className="completed-task-remove-button" onClick={() => onRemoveCompletedTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasks;
