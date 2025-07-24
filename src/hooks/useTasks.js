import { useState, useEffect } from "react";

const MOCK_TASKS = [];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("daily-tasks");
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });

  useEffect(() => {
    localStorage.setItem("daily-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
