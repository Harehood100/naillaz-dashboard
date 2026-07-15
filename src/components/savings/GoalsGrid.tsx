import GoalCard from "./GoalCard";
import type { SavingsGoal } from "@/components/services/savingsService";

type Props = {
  goals: SavingsGoal[];
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
          const percentage =
            goal.currentAmount && goal.targetAmount
              ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
              : 0;

          return (
            <GoalCard
              key={goal._id}
              title={goal.goalName}
              saved={`$${Number(goal.currentAmount).toLocaleString()}`}
              target={`$${Number(goal.targetAmount).toLocaleString()}`}
              percentage={percentage}
              completion={goal.targetDate || "—"}
            />
          );
        })
      )}
    </div>
  );
}
