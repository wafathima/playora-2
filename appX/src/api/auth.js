import API from "./axios";

export const register = (data) => API.post("/user/auth/register", data);
export const login = (data) => API.post("/user/auth/login", data);
export const getProfile = () => API.get("/user/auth/me");