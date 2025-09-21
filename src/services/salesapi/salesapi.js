import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const createSale = async (sale) => {
  const res = await axios.post(`${API_BASE}/Sales`, sale);
  return res.data;
}