import React from "react";
import { usePomodoro } from "../../hooks/usePomodoro";
import "./Widget.css";

export default function PomodoroTimer() {
  const { timeLeft, isActive, isBreak, start, pause, reset, formatTime } =
    usePomodoro();

  return (
    <div className="widget pomodoro-widget">
      <h3>🍅 Pomodoro Timer</h3>
      <div className="timer-display">
        <div className={`time ${isBreak ? "break-time" : "work-time"}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="timer-status">
          {isBreak ? "Break Time" : "Focus Time"}
        </div>
      </div>
      <div className="timer-controls">
        <button onClick={isActive ? pause : start}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
