import { Label } from "@/components/ui/label";
import { useUser } from "../provider/UserProvider";
import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type LoaderData = { users: User[] };

export async function loader(): Promise<LoaderData> {
  const response = await axios.get("/api/user/users");
  const users = response.data.users;
  return { users };
}

const HomePage = () => {
  const { users } = useLoaderData() as LoaderData;
  const [stausFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const user = useUser();

  const [status, setStatus] = useState(user.status);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleStatusChange = async (value: string) => {
    setStatus(value);
    await axios.post("/api/user/update-status", { status: value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    fetchUsers(event.target.value, stausFilter);
  };

  const handleFilterChange = (value: string) => {
    if (value === "All") return setFilteredUsers(users);
    setStatusFilter(value);
    fetchUsers(search, value);
  };

  const fetchUsers = async (search: string, filter: string) => {
    const response = await axios.post("/api/user/users/filter", {
      search,
      status: filter,
    });

    setFilteredUsers(response.data);
    setCurrentPage(1); // Reset to first page when search or filter changes
  };

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Page change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div>
      {!filteredUsers ? (
        <h1>loading</h1>
      ) : (
        <div className="grid w-screen h-screen justify-center items-center content-center gap-12">
          <Label className="font-bold text-xl">
            Hello {user.username}, you are on {user.status},
          </Label>
          <div>
            <Label className="font-bold text-xl">
              Update My Current Status:
            </Label>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Working">Working</SelectItem>
                <SelectItem value="Working Remotely">
                  Working Remotely
                </SelectItem>
                <SelectItem value="On Vacation">On Vacation</SelectItem>
                <SelectItem value="Business Trip">Business Trip</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-bold text-xl">List of employees:</Label>
            <div>
              <Input
                type="text"
                placeholder="Search by name..."
                onChange={handleSearchChange}
              />
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Working Remotely">
                    Working Remotely
                  </SelectItem>
                  <SelectItem value="On Vacation">On Vacation</SelectItem>
                  <SelectItem value="Business Trip">Business Trip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table className="border border-indigo-600">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Employees Name</TableHead>
                  <TableHead className="text-right">Employees Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user.uid}
                    className={
                      user.status === "On Vacation" ? "bg-gray-200" : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-right">{user.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination Controls */}
            <div className="flex justify-around">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  className={i + 1 === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { HomePage };
