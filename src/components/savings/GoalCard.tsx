// src/components/savings/GoalCard.tsx

type GoalCardProps = {
  title: string;
  percentage: number;
  saved: string;
  target: string;
  completion: string;
};

function getProgressColor(percentage: number): string {
  if (percentage >= 75) return "#22c55e";
  if (percentage >= 50) return "#2D6BE4";
  if (percentage <= 10) return "#ef4444";
  return "#f59e0b";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GoalCard({ title, percentage, saved, target, completion }: GoalCardProps) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>

      <div className="goal-percent">{percentage}%</div>

      <p className="goal-label">Target Met</p>

      <div className="goal-progress">
        <div
          className="goal-progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: getProgressColor(percentage) }}
        />
      </div>

      <p className="goal-detail">Saved vs Target: {saved}/{target}</p>
      <p className="goal-detail">Est Completion: {formatDate(completion)}</p>
    </div>
  );
}