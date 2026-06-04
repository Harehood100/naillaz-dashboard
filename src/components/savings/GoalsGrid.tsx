import GoalCard from "./GoalCard";

type Goal = {
  id: string;
  goalName: string;
  targetAmount: number;
  targetDate: string;
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
      {loading
        ? skeletons.map((_, i) => (
            <div key={i} className="goal-card skeleton" />
          ))
        : goals.length === 0
        ? (
          <div className="goal-card empty-state-card">
            <h3>No savings goals yet</h3>
            <p>Create your first goal to start tracking progress.</p>
          </div>
        )
        : goals.map((goal) => (
            <GoalCard
              key={goal.id}
              title={goal.goalName}
              saved={`$${goal.saved ?? 0}`}
              target={`$${goal.targetAmount}`}
              percentage={
                goal.saved && goal.targetAmount
                  ? Math.round((goal.saved / goal.targetAmount) * 100)
                  : 0
              }
              completion={goal.targetDate}
            />
          ))}
    </div>
  );
}