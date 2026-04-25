import API from "./axios";

export const getHistory = () => API.get("/history");
export const getPrediction = (id) => API.get(`/history/${id}`);
export const deletePrediction = (id) => API.delete(`/history/${id}`);