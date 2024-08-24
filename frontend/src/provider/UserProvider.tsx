import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

const userContext = createContext<
  (User & { updatUserStatus: (value: string) => void }) | null
>(null);

const useUser = () => {
  const user = useContext(userContext);

  if (!user) throw new Error("User provider must be used");
  return user;
};

export async function loader() {
  const response = await axios.get("/api/user/userData");
  return response.data;
}

const UserProvider = () => {
  const userData = useLoaderData() as User;
  const [user, setUser] = useState(userData);
  const updatUserStatus = (status: string) => {
    axios.post("/api/user/update-status", { status });
    setUser((prev) => ({ ...prev, status }));
  };

  return (
    <userContext.Provider value={{ ...user, updatUserStatus }}>
      <Outlet />
    </userContext.Provider>
  );
};

export { UserProvider, useUser };
