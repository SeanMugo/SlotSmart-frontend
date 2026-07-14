import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

import { getActiveSession } from "../../services/parkingService";

export default function ActiveSessionCard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const previousStatus = session?.payment_status;

      const data = await getActiveSession();

      if (data.message) {
        setSession(null);
      } else {
        setSession(data);

        if (
          previousStatus === "pending" &&
          data.payment_status === "paid"
        ) {
          toast.success(
            "Payment received successfully. Your parking session has been completed."
          );
        }
      }
    } catch (err) {
      console.error(err);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading active parking session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">🚗</div>

        <h2 className="text-2xl font-bold text-slate-800">
          No Active Parking Session
        </h2>

        <p className="mt-2 text-slate-500">
          You currently have no active parking session.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Active Parking Session
        </h2>

        <button
          onClick={loadSession}
          className="rounded-lg p-2 transition hover:bg-slate-100"
          title="Refresh"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Parking Slot
          </p>

          <p className="text-lg font-semibold">
            {session.slot_details?.slot_number}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            License Plate
          </p>

          <p className="text-lg font-semibold">
            {session.license_plate}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="text-lg font-semibold">
            {session.payment_status === "active"
              ? "Parking Active"
              : session.payment_status === "pending"
              ? "Awaiting Payment"
              : "Paid"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Amount Due
          </p>

          <p className="text-2xl font-bold text-[#1A5F7A]">
            {session.payment_status === "pending"
              ? `KES ${session.mpesa_amount || session.total_fee || "0.00"}`
              : "--"}
          </p>
        </div>

      </div>

      {session.payment_status === "active" && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

          <h3 className="font-semibold text-blue-800">
            🚗 Parking Session Active
          </h3>

          <p className="mt-2 text-sm text-blue-700">
            Your vehicle is currently parked.
            Payment will become available once Gate Staff initiates the check-out process.
          </p>

        </div>
      )}

      {session.payment_status === "pending" && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <h3 className="font-semibold text-amber-700">
            📲 Payment Request Sent
          </h3>

          <p className="mt-2 text-sm text-amber-700">
            Gate Staff has sent an M-Pesa payment request to your phone.
            Please approve the STK Push to complete your parking payment.
          </p>

        </div>
      )}

      {session.payment_status === "paid" && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

          <h3 className="font-semibold text-emerald-700">
            ✅ Payment Successful
          </h3>

          <p className="mt-2 text-sm text-emerald-700">
            Thank you. Your parking session has been completed successfully.
          </p>

        </div>
      )}

    </div>
  );
}