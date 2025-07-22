import React from "react";
import "./WidgetCustomizer.css";

export default function WidgetCustomizer({
  layout,
  availableWidgets,
  onToggleWidget,
  onMoveWidget,
  onClose,
}) {
  return (
    <div className="widget-customizer">
      <div className="customizer-header">
        <h3>Customize Dashboard</h3>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>

      <div className="widget-controls">
        {layout.map((widget, index) => (
          <div key={widget.id} className="widget-control">
            <div className="widget-info">
              <input
                type="checkbox"
                checked={widget.visible}
                onChange={() => onToggleWidget(widget.id)}
              />
              <span>{availableWidgets[widget.id].title}</span>
            </div>
            <div className="widget-actions">
              <button
                onClick={() => onMoveWidget(widget.id, "up")}
                disabled={index === 0}
              >
                ↑
              </button>
              <button
                onClick={() => onMoveWidget(widget.id, "down")}
                disabled={index === layout.length - 1}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
