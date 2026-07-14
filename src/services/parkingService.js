import api from "../api/axios";

/* ===========================
   Parking Slots
=========================== */

export async function getParkingSlots() {
  const { data } = await api.get("/slots/");
  return data;
}

export async function createParkingSlot(slot) {
  const { data } = await api.post("/slots/", slot);
  return data;
}

export async function updateParkingSlot(id, slot) {
  const { data } = await api.patch(`/slots/${id}/`, slot);
  return data;
}

export async function deleteParkingSlot(id) {
  const { data } = await api.delete(`/slots/${id}/`);
  return data;
}

/* ===========================
   Parking Sessions
=========================== */

export async function getParkingSessions() {
  const { data } = await api.get("/sessions/");
  return data;
}

export async function getActiveSession() {
  const { data } = await api.get("/sessions/active/");
  return data;
}

export async function getSessionHistory() {
  const { data } = await api.get("/sessions/history/");
  return data;
}

export async function checkIn(payload) {
  const { data } = await api.post(
    "/sessions/check_in/",
    payload
  );

  return data;
}

// =========================
// CHECK OUT
// =========================

export const checkOut = async (
  sessionId,
  phoneNumber
) => {
  const response = await api.post(
    `/sessions/${sessionId}/check_out/`,
    {
      phone_number: phoneNumber,
    }
  );

  return response.data;
};

/* ===========================
   M-Pesa
=========================== */

export async function sendMpesaSTKPush(payload) {
  const { data } = await api.post(
    "/mpesa/stk-push/",
    payload
  );

  return data;
}