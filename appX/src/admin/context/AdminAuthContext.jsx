import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("admin_token");
    
    if (storedAdmin && token) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const adminLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setAdmin(data.admin);
        navigate("/admin/dashboard", { replace: true });
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: "Connection failed" };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/admin/login");
  };

  const value = {
    admin,
    loading,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};