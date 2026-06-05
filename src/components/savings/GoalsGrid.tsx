import GoalCard from "./GoalCard";

type Goal = {
  _id: string;          // backend returns _id not id
  goalName?: string;    // frontend field
  title?: string;       // backend field
  targetAmount: number;
  targetDate: string;
  currentAmount?: number; // backend field (replaces saved)
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
        : goals.map((goal) => {
            const name = goal.goalName ?? goal.title ?? "Untitled";
            const saved = goal.saved ?? goal.currentAmount ?? 0;

            return (
              <GoalCard
                key={goal._id}                  // _id instead of id
                title={name}
                saved={`$${saved}`}
                target={`$${goal.targetAmount}`}
                percentage={
                  saved && goal.targetAmount
                    ? Math.round((saved / goal.targetAmount) * 100)
                    : 0
                }
                completion={goal.targetDate}
              />
            );
          })}
    </div>
  );
}
