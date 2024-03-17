import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // retrieve user from profile api (using token to send user, which is set here and displayed)
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        console.log(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
