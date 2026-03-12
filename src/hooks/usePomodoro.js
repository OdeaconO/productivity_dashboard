import { useState, useEffect, useRef } from "react";

const WORK_TIME = 1 * 60; // 25 minutes
const BREAK_TIME = 1 * 60; // 5 minutes

export function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  const [isRinging, setIsRinging] = useState(false);
  const audioRef = useRef(null);

  const handledCompletionRef = useRef(false);

  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem("pomodoro-sessions");
    return saved ? JSON.parse(saved) : 0;
  });

  const [lastSessionDate, setLastSessionDate] = useState(() => {
    return localStorage.getItem("pomodoro-last-date");
  });

  useEffect(() => {
    const today = new Date().toDateString();

    if (lastSessionDate !== today) {
      setSessionsCompleted(0);
      setLastSessionDate(today);
      localStorage.setItem("pomodoro-last-date", today);
    }
  }, [lastSessionDate]);

  useEffect(() => {
    audioRef.current = new Audio("/alarm.wav");
  }, []);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft !== 0) {
      handledCompletionRef.current = false;
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isActive || timeLeft !== 0 || handledCompletionRef.current) return;

    handledCompletionRef.current = true;

    setIsBreak((prevIsBreak) => {
      if (!prevIsBreak) {
        setSessionsCompleted((prev) => prev + 1);
      }

      const nextIsBreak = !prevIsBreak;

      setTimeLeft(nextIsBreak ? BREAK_TIME : WORK_TIME);
      setIsActive(false);

      setIsRinging(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.loop = true;
        audioRef.current.play();
      }

      return nextIsBreak;
    });
  }, [timeLeft, isActive]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    clearInterval(intervalRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsRinging(false);
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    localStorage.setItem(
      "pomodoro-sessions",
      JSON.stringify(sessionsCompleted),
    );
  }, [sessionsCompleted]);

  const dismissAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRinging(false);
  };

  return {
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
  };
}
