import UserDataTable from "./UserDataTable";
import Layout from "../Layout";
import { userApi } from "@/api/admin/userApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
];

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  // Define which roles each user type can create
  const getCreatableRoles = (userRole) => {
    const roleMap = {
      system_admin: ['system_technician', 'developer_admin'],
      developer_admin: ['developer_marketing', 'developer_sales'],
    };
    return roleMap[userRole] || [];
  };

  const fetchUsers = async () => {
    try {
      let response;
      if (user?.role === 'admin' || user?.role === 'system_admin' || user?.role === 'system_technician') {
        response = await userApi.getAll();
      } else if (user?.role === 'developer_admin' ){
        // console.log(user.developerId);
        response = await userApi.getUsersByDevId(user.developerId);
        // console.log(response);
      } else {
        setUsers([]);
        toast.error("You don't have permission to view users");
        return
      }
      
      // Check if response is an array (from getUsersByDevId) or has data property (from getAll)
      setUsers(Array.isArray(response) ? response : response.data);
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
      // Get allowed roles for current user
      const creatableRoles = getCreatableRoles(user?.role);
      
      // Check if user has permission to create users
      if (creatableRoles.length === 0) {
        toast.error("You don't have permission to create users");
        return;
      }

      // Validate required fields
      if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
        toast.error("Please fill in all required fields: email, password, name, and role");
        return;
      }

      // Check if the requested role is allowed for this user
      if (!creatableRoles.includes(newUser.role)) {
        toast.error(`You can only create users with these roles: ${creatableRoles.join(', ')}`);
        return;
      }

      // Prepare user data with all required fields
      const userData = {
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        role: newUser.role,
      };

      // Add developerId if provided form (system_admin selecting developer for developer_admin)
      if (newUser.developerId) {
        userData.developerId = newUser.developerId;
      }
      if(newUser.role === 'developer_sales' || newUser.role === 'developer_marketing') {
        userData.developerId = user.developerId; // Automatically assign developerId for developer_admin creating sub-users        
      }

      const createdUser = await userApi.create(userData);
      setUsers([...users, createdUser.data || createdUser]);
      toast.success("User created successfully");
      console.log("Created user:", createdUser);
    } catch (error) {
      toast.error(error.message || "Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  const handleEdit = async (editedUser) => {
    try {
      // Only send the fields that should be updated: name, isActive, and developerId (if applicable)
      const updateData = {
        name: editedUser.name,
        isActive: editedUser.isActive,
      };
      
      // If system_admin is updating a developer_admin's developer, include developerId
      if (user?.role === 'system_admin' && editedUser.role === 'developer_admin' && editedUser.developerId) {
        updateData.developerId = editedUser.developerId;
      }
      
      const updatedUser = await userApi.update(editedUser.id, updateData);
      setUsers(users.map(user => user.id === editedUser.id ? (updatedUser.data || updatedUser) : user));
      toast.success("User updated successfully");
      console.log("Updated user:", updatedUser);
    } catch (error) {
      toast.error(error.message || "Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userToDelete) => {
    try {
      // Prevent users from deleting themselves
      if (userToDelete.id === user?.id) {
        toast.error("You cannot delete yourself");
        return;
      }
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
