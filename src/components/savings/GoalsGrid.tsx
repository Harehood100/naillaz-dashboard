// src/components/savings/GoalsGrid.tsx
import GoalCard from "./GoalCard";

type Goal = {
  _id: string;
  goalName?: string;
  title?: string;
  targetAmount: number;
  targetDate: string;
  currentAmount?: number;
  saved?: number;
};

type Props = {
  goals: Goal[];
  loading?: boolean;
};

export default function GoalsGrid({ goals, loading }: Props) {
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="goals-grid">
      {loading ? (
        skeletons.map((_, i) => (
          <div key={i} className="goal-card skeleton" />
        ))
      ) : goals.length === 0 ? (
        <div className="goal-card empty-state-card">
          <h3>No savings goals yet</h3>
          <p>Create your first goal to start tracking progress.</p>
        </div>
      ) : (
        goals.map((goal) => {
          const name = goal.goalName ?? goal.title ?? "Untitled";
          const savedAmount = goal.saved ?? goal.currentAmount ?? 0;
          const percentage =
            savedAmount && goal.targetAmount
              ? Math.round((savedAmount / goal.targetAmount) * 100)
              : 0;

          return (
            <GoalCard
              key={goal._id}
              title={name}
              saved={`$${Number(savedAmount).toLocaleString()}`}
              target={`$${Number(goal.targetAmount).toLocaleString()}`}
              percentage={percentage}
              completion={goal.targetDate}
            />
          );
        })
      )}
    </div>
  );
}