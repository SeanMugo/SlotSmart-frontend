import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <DashboardHeader />

        <StatsCards />
      </div>
    </div>
  );
}