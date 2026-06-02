import GoalCard from "./GoalCard";

export default function GoalsGrid() {
  return (
    <div className="goals-grid">
      <GoalCard
        title="Emergency Fund"
        percentage={65}
        saved="$13,000"
        target="$20,000"
        completion="Aug 29, 2026"
      />

      <GoalCard
        title="New Office"
        percentage={12}
        saved="$1,800"
        target="$15,000"
        completion="Nov 15, 2026"
      />

      <GoalCard
        title="Tax Reserve"
        percentage={88}
        saved="$22,000"
        target="$25,000"
        completion="Jun 26, 2026"
      />

      <GoalCard
        title="Employees Wages"
        percentage={5}
        saved="$2,000"
        target="$30,000"
        completion="Jan 12, 2027"
      />
    </div>
  );
}