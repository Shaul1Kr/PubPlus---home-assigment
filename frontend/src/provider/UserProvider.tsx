import axios from "axios";
import { createContext, useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

const userContext = createContext<User | null>(null);

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
  const user = useLoaderData() as User;

  return (
    <userContext.Provider value={user}>
      <Outlet />
    </userContext.Provider>
  );
};

export { UserProvider, useUser };
