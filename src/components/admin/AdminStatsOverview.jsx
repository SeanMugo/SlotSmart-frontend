import { useEffect, useState } from "react";
import { ParkingSquare, Car, Users, Wallet } from "lucide-react";

import { getParkingSlots, getActiveSession } from "../../services/parkingService";
import { getAllUsers } from "../../services/adminService";

export default function AdminStatsOverview() {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    activeSessions: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    try {
      const [slotsData, sessionsData, usersData] = await Promise.all([
        getParkingSlots(),
        getActiveSession(),
        getAllUsers(),
      ]);

      const slots = Array.isArray(slotsData)
        ? slotsData
        : slotsData.results || [];
      const sessions = Array.isArray(sessionsData) ? sessionsData : [];
      const users = Array.isArray(usersData) ? usersData : [];

      setStats({
        totalSlots: slots.length,
        availableSlots: slots.filter((s) => s.status === "available").length,
        occupiedSlots: slots.filter((s) => s.status === "occupied").length,
        activeSessions: sessions.length,
        totalUsers: users.length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Available Slots",
      value: `${stats.availableSlots} / ${stats.totalSlots}`,
      icon: ParkingSquare,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Occupied Slots",
      value: stats.occupiedSlots,
      icon: Car,
      color: "text-[#1A5F7A]",
      bg: "bg-[#1A5F7A]/10",
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions,
      icon: Wallet,
      color: "text-[#22A39F]",
      bg: "bg-[#22A39F]/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className={`mb-4 inline-flex rounded-xl ${card.bg} p-3 ${card.color}`}>
              <Icon size={22} />
            </div>
            <p className="text-sm text-slate-500">{card.title}</p>
            <h2 className={`mt-1 text-3xl font-bold ${loading ? "text-slate-300" : card.color}`}>
              {loading ? "—" : card.value}
            </h2>
          </div>
        );
      })}
    </section>
  );
}