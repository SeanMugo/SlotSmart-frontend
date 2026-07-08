import useDashboard from "../../hooks/useDashboard";

export default function StatsCards() {
  const {
    availableSlots,
    walletBalance,
    loading,
  } = useDashboard();

  const stats = [
    {
      title: "Available Slots",
      value: loading ? "..." : availableSlots,
      color: "text-emerald-600",
    },
    {
      title: "Wallet Balance",
      value: `KES ${walletBalance}`,
      color: "text-[#1A5F7A]",
    },
    {
      title: "System Status",
      value: "Online",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {stat.title}
          </p>

          <h2 className={`mt-2 text-3xl font-bold ${stat.color}`}>
            {stat.value}
          </h2>
        </div>
      ))}
    </section>
  );
}