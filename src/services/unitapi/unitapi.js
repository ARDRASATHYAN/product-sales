import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchUnits = async () => {
  const res = await axios.get(`${API_BASE}/Units`);
  return res.data;
};



export const fetchUnitById = async (id) => {
  const res = await axios.get(`${API_BASE}/Units/${id}`);
  return res.data;
};