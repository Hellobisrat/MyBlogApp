import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) setUser(JSON.parse(savedUser)); // ✅ Only store user details

  const token = localStorage.getItem("token");
  if (!savedUser && token) {
    setUser({ token }); // ✅ Store token only if user is missing
  }
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};