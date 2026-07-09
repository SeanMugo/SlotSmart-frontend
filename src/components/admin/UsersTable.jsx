import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserCog } from "lucide-react";

import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../../services/adminService";
import useAuth from "../../hooks/useAuth";

const ROLE_LABELS = {
  driver: "Driver",
  gate_staff: "Gate Staff",
  admin: "Admin",
};

export default function UsersTable() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  const toggleActive = async (targetUser) => {
    setBusyId(targetUser.id);
    try {
      if (targetUser.is_active) {
        await deactivateUser(targetUser.id);
        toast.success(`${targetUser.username} deactivated.`);
      } else {
        await activateUser(targetUser.id);
        toast.success(`${targetUser.username} activated.`);
      }
      loadUsers();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Could not update this user."
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="inline-flex rounded-xl bg-[#1A5F7A]/10 p-2.5 text-[#1A5F7A]">
          <UserCog size={20} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">
          Users ({users.length})
        </h2>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Username</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-slate-800">
                      {u.username}
                    </p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {ROLE_LABELS[u.role] || u.role}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.is_active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleActive(u)}
                      disabled={busyId === u.id || u.id === currentUser?.id}
                      title={
                        u.id === currentUser?.id
                          ? "You cannot change your own status"
                          : ""
                      }
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busyId === u.id
                        ? "..."
                        : u.is_active
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}