import React from "react";
import { usePomodoro } from "../../hooks/usePomodoro";
import "./Widget.css";

export default function PomodoroTimer() {
  const {
    timeLeft,
    isActive,
    isBreak,
    isRinging,
    sessionsCompleted,
    start,
    pause,
    reset,
    dismissAlarm,
    formatTime,
  } = usePomodoro();

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
      <div className="session-counter">
        {sessionsCompleted} Pomodoros today!
      </div>
      <div className="timer-controls">
        <button onClick={isActive ? pause : start}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
        {isRinging && (
          <button className="dismiss-btn" onClick={dismissAlarm}>
            Dismiss Alarm
          </button>
        )}
      </div>
    </div>
  );
}
