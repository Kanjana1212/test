import React from "react";
import "./GoalCard.css";

export default function GoalCard({ goal }) {
  return (
    <div className="goal-box vertical">
      {goal.image && <img src={goal.image} alt={goal.title} className="goal-image" />}
      <div className="goal-title">{goal.title}</div>
      <div className="goal-info">{goal.date} • {goal.account}</div>
      <div className="goal-amount">{goal.amount}</div>
    </div>
  );
}
