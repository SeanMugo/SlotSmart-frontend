import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogOut, RefreshCw } from "lucide-react";

import { getActiveSession, checkOut } from "../../services/parkingService";

export default function ActiveSessionsTable({ refreshKey }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOutId, setCheckingOutId] = useState(null);

  useEffect(() => {
    loadSessions();
  }, [refreshKey]);

  async function loadSessions() {
    setLoading(true);
    try {
      const data = await getActiveSession();
      // Staff (gate_staff/admin) get a raw list; drivers get a single
      // session or a { message } object — this page is staff-only.
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load active sessions.");
    } finally {
      setLoading(false);
    }
  }

  const handleCheckOut = async (sessionId) => {
    setCheckingOutId(sessionId);
    try {
      const response = await checkOut(sessionId);

      if (response.payment_required) {
        toast.success(
          `Checked out. ${response.payment_method === "mpesa" ? "M-Pesa" : "Wallet + M-Pesa"} payment of KES ${response.session?.mpesa_amount ?? ""} still required.`,
          { duration: 6000 }
        );
      } else {
        toast.success(
          `Checked out. KES ${response.total_fee} paid in full from wallet.`
        );
      }

      loadSessions();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Check-out failed. Please try again."
      );
    } finally {
      setCheckingOutId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-[#22A39F]/10 p-2.5 text-[#22A39F]">
            <LogOut size={20} />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Active Sessions
          </h2>
        </div>

        <button
          onClick={loadSessions}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          title="Refresh"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-400">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No vehicles currently parked.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Plate</th>
                <th className="pb-3 pr-4 font-medium">Driver</th>
                <th className="pb-3 pr-4 font-medium">Slot</th>
                <th className="pb-3 pr-4 font-medium">Checked In</th>
                <th className="pb-3 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 pr-4 font-semibold text-slate-800">
                    {session.license_plate}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {session.user_details?.username}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {session.slot_details?.slot_number}
                  </td>
                  <td className="py-3 pr-4 text-slate-500">
                    {new Date(session.check_in_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleCheckOut(session.id)}
                      disabled={checkingOutId === session.id}
                      className="rounded-lg bg-[#F2A65A] px-4 py-1.5 text-sm font-semibold text-slate-800 transition hover:bg-[#e0954a] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {checkingOutId === session.id
                        ? "Processing..."
                        : "Check Out"}
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