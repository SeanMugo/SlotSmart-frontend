import useAuth from "./useAuth";
import useParking from "./useParking";

export default function useDashboard() {
  const { user } = useAuth();
  const { slots, loading } = useParking();

  const availableSlots = slots.filter(
    (slot) => slot.status === "available"
  ).length;

  return {
    user,
    loading,
    availableSlots,
    walletBalance: user?.wallet_balance || "0.00",
  };
}