import { useUser } from "../provider/UserProvider";
import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

export type LoaderData = { users: User[] };

export async function loader(): Promise<LoaderData> {
  const response = await axios.get("/api/user/users");

  const users = response.data.users;
  return { users };
}

const HomePage = () => {
  const { users } = useLoaderData() as LoaderData;
  const user = useUser();
  console.log({ users, user });

  const [status, setStatus] = useState(user.status);

  const statusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    await axios.post("/api/user/update-status", {
      status: event.target.value,
    });
  };

  return (
    <div>
      {!users ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>
            Hello {user?.username}, you are on {user?.status},
          </h1>
          <h1>Update My Current Status:</h1>
          <select onChange={statusChange} value={status}>
            <option value="Working">Working</option>
            <option value="Working Remotely">Working Remotely</option>
            <option value="On Vacation">On Vacation</option>
            <option value="Business Trip">Business Trip</option>
          </select>
          <h1>List of employees:</h1>
        </div>
      )}
    </div>
  );
};

export { HomePage };
