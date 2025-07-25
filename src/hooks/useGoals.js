import { useState, useEffect } from "react";

const MOCK_GOALS = [];

export function useGoals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("user-goals");
    return saved ? JSON.parse(saved) : MOCK_GOALS;
  });

  useEffect(() => {
    localStorage.setItem("user-goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (text) => {
    const newGoal = {
      id: Date.now(),
      text,
      progress: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateProgress = (id, change) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.max(0, Math.min(100, goal.progress + change)),
            }
          : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return { goals, addGoal, updateProgress, deleteGoal };
}
