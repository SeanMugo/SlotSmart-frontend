import useAuth from "../../hooks/useAuth";

export default function DashboardHeader() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good evening";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <header className="mb-10">
      <p className="text-sm font-medium uppercase tracking-wide text-[#22A39F]">
        {greeting}
      </p>

      <h1 className="mt-2 text-4xl font-bold text-slate-900">
        {user?.username || "Driver"}
      </h1>

      <p className="mt-2 text-slate-500">
        Here's an overview of your parking activity.
      </p>
    </header>
  );
}