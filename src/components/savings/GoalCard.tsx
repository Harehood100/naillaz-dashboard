type GoalCardProps = {
  title: string;
  percentage: number;
  saved: string;
  target: string;
  completion: string;
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 75) return "#22c55e"; // green
  if (percentage >= 50) return "#2D6BE4"; // blue
  if (percentage <= 10) return "#ef4444"; // red
  return "#f59e0b"; // amber
};

export default function GoalCard({
  title,
  percentage,
  saved,
  target,
  completion,
}: GoalCardProps) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>

      <div className="goal-percent">
        {percentage}%
      </div>

      <p className="goal-label">Target Met</p>

      <div className="goal-progress">
        <div
          className="goal-progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: getProgressColor(percentage) }}
        />
      </div>

      <p className="goal-detail">
        Saved vs Target: {saved}/{target}
      </p>

      <p className="goal-detail">
        Est Completion: {completion}
      </p>
    </div>
  );
}