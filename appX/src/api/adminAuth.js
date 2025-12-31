// import API from "./axios";

// export const adminLogin = (data) =>
//   API.post("/admin/auth/login", data);

// src/api/adminAuth.js
import { adminAPI } from "./axios";

export const adminLogin = async (email, password) => {
  try {
    const response = await adminAPI.post("/admin/auth/login", {
      email,
      password,
    });
    
    if (response.data.success) {
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
    }
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: "Admin login failed" };
  }
};

export const getAdminProfile = async () => {
  try {
    const response = await adminAPI.get("/admin/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch admin profile" };
  }
};