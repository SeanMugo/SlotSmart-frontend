import { Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const ROLE_LABELS = {
  driver: "Driver",
  gate_staff: "Gate Staff",
  admin: "Admin",
};

export default function Topbar() {
  const { user } = useAuth();
  const initial = (user?.username || "?").charAt(0).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back.
        </p>
      </div>

      <div className="flex items-center gap-4">
    
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
            {initial}
          </div>

          <div>
            <p className="text-sm font-medium">{user?.username || "User"}</p>
            <p className="text-xs text-slate-500">
              {ROLE_LABELS[user?.role] || ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}