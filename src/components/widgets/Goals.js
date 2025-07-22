import React, { useState } from "react";
import { useGoals } from "../../hooks/useGoals";
import "./Widget.css";

export default function Goals() {
  const { goals, addGoal, updateProgress, deleteGoal } = useGoals();
  const [newGoal, setNewGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      setNewGoal("");
    }
  };

  return (
    <div className="widget goals-widget">
      <h3>🎯 Goals</h3>

      <form onSubmit={handleSubmit} className="add-goal-form">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new goal..."
          className="goal-input"
        />
        <button className="add-goal-button" type="submit">
          Add
        </button>
      </form>

      <div className="goals-list">
        {goals.map((goal) => (
          <div key={goal.id} className="goal-item">
            <div className="goal-header">
              <span className="goal-text">{goal.text}</span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <span className="progress-text">{goal.progress}%</span>
            </div>
            <div className="progress-controls">
              <button
                classname="goal-btn"
                onClick={() => updateProgress(goal.id, -10)}
              >
                -10%
              </button>
              <button
                className="goal-btn"
                onClick={() => updateProgress(goal.id, 10)}
              >
                +10%
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
