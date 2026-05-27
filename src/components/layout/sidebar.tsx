import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-10">SpendWise</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/income">Income</Link>
        <Link href="/expenses">Expenses</Link>
        <Link href="/savings">Savings</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}