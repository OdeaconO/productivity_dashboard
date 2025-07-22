import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import "./Widget.css";

export default function DailyPlanner() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="widget planner-widget">
      <h3>📅 Daily Planner</h3>

      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button class="add-task-button" type="submit">
          Add
        </button>
      </form>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
