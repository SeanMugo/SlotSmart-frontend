import useAuth from "../hooks/useAuth";
import AdminStatsOverview from "../components/admin/AdminStatsOverview";
import UsersTable from "../components/admin/UsersTable";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-[#22A39F]">
            Admin
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {user?.username || "Admin"}
          </h1>
          <p className="mt-2 text-slate-500">
            Overview of parking activity and user accounts.
          </p>
        </header>

        <AdminStatsOverview />

        <div className="mt-10">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}