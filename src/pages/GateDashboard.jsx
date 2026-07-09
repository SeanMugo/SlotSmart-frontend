import { useState } from "react";
import useAuth from "../hooks/useAuth";
import CheckInForm from "../components/gate/CheckInForm";
import ActiveSessionsTable from "../components/gate/ActiveSessionsTable";

export default function GateDashboard() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-[#22A39F]">
            Gate Staff
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {user?.username || "Gate Staff"}
          </h1>
          <p className="mt-2 text-slate-500">
            Check vehicles in and out as they arrive and leave.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <CheckInForm onCheckedIn={() => setRefreshKey((k) => k + 1)} />
          <ActiveSessionsTable refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}