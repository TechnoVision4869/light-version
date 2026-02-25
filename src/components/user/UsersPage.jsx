import UserDataTable from "./UserDataTable";
import Layout from "../Layout";
import { userApi } from "@/api/admin/userApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";

const sampleDevId = "b8793740-6574-4492-8aae-024a518cd46b";

const sampleUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    isActive: true,
    isEmailVerified: true,
    password: "securePassword123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "developer_admin",
    isActive: true,
    isEmailVerified: true,
    password: "securePassword123",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "developer_sales",
    isActive: false,
    isEmailVerified: false,
    password: "securePassword123",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "developer_marketing",
    isActive: true,
    isEmailVerified: true,
    password: "securePassword123",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "system_admin",
    isActive: true,
    isEmailVerified: false,
    password: "securePassword123",
  },
];

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
];

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState(sampleUserData);

  const fetchUsers = async () => {
    try {
      let response;
      if (user?.role === 'admin') {
        response = await userApi.getAll();
      } else {
        response = await userApi.getUsersByDevId(user?.id);
      }
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (newUser) => {
    try {
      // Only admin and developer_admin can create users
      if (user?.role !== 'admin' && user?.role !== 'developer_admin') {
        toast.error("You don't have permission to create users");
        return;
      }
      const createdUser = await userApi.create(newUser);
      setUsers([...users, createdUser]);
      toast.success("User created successfully");
      console.log("Created user:", createdUser);
    } catch (error) {
      toast.error(error.message || "Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  const handleEdit = async (editedUser) => {
    try {
      // Only send the fields that should be updated, exclude password and other sensitive fields
      const updateData = {
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
      };
      const updatedUser = await userApi.update(editedUser.id, updateData);
      setUsers(users.map(user => user.id === editedUser.id ? updatedUser : user));
      toast.success("User updated successfully");
      console.log("Updated user:", updatedUser);
    } catch (error) {
      toast.error(error.message || "Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userToDelete) => {
    try {
      await userApi.delete(userToDelete.id);
      // Refetch users to verify deletion actually worked on the backend
      await fetchUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user");
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <UserDataTable
          data={users}
          columns={columns}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
}
