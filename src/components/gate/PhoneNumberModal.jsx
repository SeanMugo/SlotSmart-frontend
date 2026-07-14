import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PhoneNumberModal({
  isOpen,
  session,
  loading,
  onClose,
  onConfirm,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPhoneNumber("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    const formatted = phoneNumber.replace(/\s+/g, "");

    if (!/^2547\d{8}$/.test(formatted)) {
      toast.error(
        "Enter a valid phone number (2547XXXXXXXX)."
      );
      return;
    }

    onConfirm(formatted);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold text-slate-800">
          Driver Phone Number
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Enter the M-Pesa phone number for{" "}
          <span className="font-semibold">
            {session?.user_details?.username}
          </span>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <input
            autoFocus
            type="tel"
            placeholder="254712345678"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#1A5F7A] px-5 py-2 font-semibold text-white disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : "Send STK Push"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}