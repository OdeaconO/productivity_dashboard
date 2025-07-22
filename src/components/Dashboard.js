import React, { useState } from "react";
import PomodoroTimer from "./widgets/PomodoroTimer";
import DailyPlanner from "./widgets/DailyPlanner";
import Goals from "./widgets/Goals";
import Quotes from "./widgets/Quotes";
import WidgetCustomizer from "./WidgetCustomizer";
import { useDashboardLayout } from "../hooks/useDashboardLayout";
import "./Dashboard.css";

const AVAILABLE_WIDGETS = {
  pomodoro: { component: PomodoroTimer, title: "Pomodoro Timer" },
  planner: { component: DailyPlanner, title: "Daily Planner" },
  goals: { component: Goals, title: "Goals" },
  quotes: { component: Quotes, title: "Quotes" },
};

export default function Dashboard() {
  const { layout, updateLayout, toggleWidget, moveWidget } =
    useDashboardLayout();
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Productivity Dashboard</h1>
        <button
          className="customize-btn"
          onClick={() => setShowCustomizer(!showCustomizer)}
        >
          Customize
        </button>
      </header>

      {showCustomizer && (
        <WidgetCustomizer
          layout={layout}
          availableWidgets={AVAILABLE_WIDGETS}
          onToggleWidget={toggleWidget}
          onMoveWidget={moveWidget}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      <div className="widgets-grid">
        {layout.map((widget, index) => {
          if (!widget.visible) return null;

          const WidgetComponent = AVAILABLE_WIDGETS[widget.id].component;
          return (
            <div key={widget.id} className={`widget-container ${widget.size}`}>
              <WidgetComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
