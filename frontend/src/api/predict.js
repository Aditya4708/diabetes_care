import API from "./axios";

export const predict = (data) => API.post("/predict", data);
export const getRecommendations = (data) => API.post("/ai/recommend", data);