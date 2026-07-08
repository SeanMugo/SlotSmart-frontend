import { Link } from "react-router-dom";
import {
  CarFront,
  Wallet,
  User,
} from "lucide-react";

const actions = [
  {
    title: "Parking Slots",
    description: "View available parking slots.",
    icon: CarFront,
    path: "/slots",
  },
  {
    title: "Wallet",
    description: "View your wallet balance.",
    icon: Wallet,
    path: "/wallet",
  },
  {
    title: "Profile",
    description: "Manage your account.",
    icon: User,
    path: "/profile",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl font-semibold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#22A39F] hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#1A5F7A]/10 p-3 text-[#1A5F7A]">
                <Icon size={24} />
              </div>

              <h3 className="font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}