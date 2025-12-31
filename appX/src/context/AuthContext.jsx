import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        const res = await API.get("/user/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      }
    }
    setLoading(false);
  };


  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/user/auth/login", { email, password });
      
      if (res.data.success) {
        const { token, user } = res.data;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
  try {
    const res = await API.post("/user/auth/register", {
      name,
      email,
      password
    });

    if (res.data.success) {
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true };
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


  const logout = () => {
    clearAuth();
  };

const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.put(
      "/user/profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    }
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

// const updateProfile = async (profileData) => {
//   const token = localStorage.getItem("token");

//   try {
//     const res = await API.put(
//       "/user/profile",
//       profileData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json', // Explicitly set JSON
//         },
//       }
//     );

//     if (res.data.success) {
//       setUser(res.data.user);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       return res.data;
//     }
//   } catch (error) {
//     console.error("Update profile error:", error);
//     throw error;
//   }
// };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};