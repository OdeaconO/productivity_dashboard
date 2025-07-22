import { useState, useEffect } from "react";

const DEFAULT_LAYOUT = [
  { id: "pomodoro", visible: true, size: "medium", order: 0 },
  { id: "planner", visible: true, size: "large", order: 1 },
  { id: "goals", visible: true, size: "medium", order: 2 },
  { id: "quotes", visible: true, size: "small", order: 3 },
];

export function useDashboardLayout() {
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem("dashboard-layout");
    return saved ? JSON.parse(saved) : DEFAULT_LAYOUT;
  });

  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
  }, [layout]);

  const updateLayout = (newLayout) => {
    setLayout(newLayout);
  };

  const toggleWidget = (widgetId) => {
    setLayout((prev) =>
      prev.map((widget) =>
        widget.id === widgetId
          ? { ...widget, visible: !widget.visible }
          : widget
      )
    );
  };

  const moveWidget = (widgetId, direction) => {
    setLayout((prev) => {
      const newLayout = [...prev];
      const index = newLayout.findIndex((w) => w.id === widgetId);
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < newLayout.length) {
        [newLayout[index], newLayout[newIndex]] = [
          newLayout[newIndex],
          newLayout[index],
        ];
      }

      return newLayout;
    });
  };

  return { layout, updateLayout, toggleWidget, moveWidget };
}
