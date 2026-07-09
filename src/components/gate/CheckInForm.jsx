import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

import { getParkingSlots, checkIn } from "../../services/parkingService";

export default function CheckInForm({ onCheckedIn }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    loadSlots();
  }, []);

  async function loadSlots() {
    setLoadingSlots(true);
    try {
      const data = await getParkingSlots();
      const slots = Array.isArray(data) ? data : data.results || [];
      setAvailableSlots(slots.filter((slot) => slot.status === "available"));
    } catch (error) {
      console.error(error);
      toast.error("Could not load parking slots.");
    } finally {
      setLoadingSlots(false);
    }
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        driver_id: Number(data.driver_id),
        slot_id: Number(data.slot_id),
        license_plate: data.license_plate,
      };

      const response = await checkIn(payload);

      toast.success(response.message || "Vehicle checked in successfully.");
      reset();
      loadSlots();
      onCheckedIn?.();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Check-in failed. Please try again."
      );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="inline-flex rounded-xl bg-[#1A5F7A]/10 p-2.5 text-[#1A5F7A]">
          <LogIn size={20} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">
          Check In a Vehicle
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Driver ID
          </label>
          <input
            type="number"
            placeholder="e.g. 4"
            disabled={isSubmitting}
            {...register("driver_id", { required: "Driver ID is required" })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          />
          <p className="mt-1 text-xs text-slate-400">
            Ask the driver for their account ID (shown on their profile).
          </p>
          {errors.driver_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.driver_id.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            License Plate
          </label>
          <input
            type="text"
            placeholder="e.g. KDA 123B"
            disabled={isSubmitting}
            {...register("license_plate", {
              required: "License plate is required",
              minLength: { value: 6, message: "Enter a valid plate number" },
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 uppercase outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          />
          {errors.license_plate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.license_plate.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Parking Slot
          </label>
          <select
            disabled={isSubmitting || loadingSlots}
            {...register("slot_id", { required: "Select a slot" })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          >
            <option value="">
              {loadingSlots ? "Loading slots..." : "Select an available slot"}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.slot_number} · Floor {slot.floor} · Zone {slot.zone} ·
                KES {slot.base_rate}/hr
              </option>
            ))}
          </select>
          {!loadingSlots && availableSlots.length === 0 && (
            <p className="mt-1 text-xs text-amber-600">
              No available slots right now.
            </p>
          )}
          {errors.slot_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.slot_id.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#1A5F7A] py-3 font-semibold text-white transition hover:bg-[#164d63] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Checking In..." : "Check In Vehicle"}
        </button>
      </form>
    </div>
  );
}