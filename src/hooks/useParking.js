import { useEffect, useState } from "react";
import { getParkingSlots } from "../services/parkingService";

export default function useParking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refreshSlots() {
    try {
      setLoading(true);
      const data = await getParkingSlots();
      setSlots(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshSlots();
  }, []);

  return {
    slots,
    loading,
    refreshSlots,
  };
}