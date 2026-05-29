type StatCardProps = {
  title: string;
  amount: string;
};

export default function StatCard({
  title,
  amount,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{amount}</h2>
    </div>
  );
}
