import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/Products`);
  return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(`${API_BASE}/Products`, data);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/Products/${id}`);
  return res.data;
};
