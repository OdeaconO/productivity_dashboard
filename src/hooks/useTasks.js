import { useState, useEffect } from "react";

const MOCK_TASKS = [
  { id: 1, text: "Review project proposal", completed: false },
  { id: 2, text: "Call client about meeting", completed: true },
  { id: 3, text: "Update portfolio website", completed: false },
  { id: 4, text: "Prepare presentation slides", completed: false },
];

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
