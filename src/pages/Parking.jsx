import useParking from "../hooks/useParking";

function getStatusStyle(status) {
  switch (status) {
    case "available":
      return "bg-emerald-100 text-emerald-700";

    case "reserved":
      return "bg-amber-100 text-amber-700";

    case "occupied":
      return "bg-red-100 text-red-700";

    case "maintenance":
      return "bg-slate-200 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function Parking() {
  const { slots, loading } = useParking();

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-slate-500 text-lg">
          Loading parking slots...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Parking Availability
      </h1>

      <p className="mb-8 text-slate-500">
        View the current status of all parking slots.
      </p>

      {slots.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-slate-500">
            No parking slots found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {slot.slot_number}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    slot.status
                  )}`}
                >
                  {slot.status_display}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <strong>Zone:</strong> {slot.zone}
                </p>

                <p>
                  <strong>Floor:</strong> {slot.floor}
                </p>

                <p>
                  <strong>Vehicle Type:</strong> {slot.slot_type}
                </p>

                <p>
                  <strong>Rate:</strong> KES {slot.base_rate}/hr
                </p>

                {slot.has_charger && (
                  <p className="font-medium text-[#1A5F7A]">
                    ⚡ EV Charging Available
                  </p>
                )}
              </div>

              {/* Future Feature */}
              {/*
              Version 2:
              Drivers will be able to select a preferred slot.
              Gate Staff will confirm or reassign it during check-in.
              */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}