import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { developerApi } from "@/api/admin/developerApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ROLE_OPTIONS, formatRole } from '@/constants/roles';

const getDisplayRole = (role, loggedInUserRole) => {
  // If the logged-in user is a developer_admin, show simplified role names
  if (loggedInUserRole === 'developer_admin') {
    if (role === 'developer_admin') return 'Admin';
    if (role === 'developer_marketing') return 'Marketing';
    if (role === 'developer_sales') return 'Sales';
  }
  return formatRole(role);
};

const CreateUserForm = ({ onSuccess, onCancel, loggedInUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [developers, setDevelopers] = useState([]);
  
  // Fetch developers list when component mounts
  const fetchDevelopers = async () => {
    if (loggedInUser?.role === 'system_admin') {
      try {
        const devs = await developerApi.getAll();
        setDevelopers(devs);
      } catch (error) {
        console.error("Error fetching developers:", error);
      } 
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    role: Yup.string().required("Role is required"),
    developerId: Yup.string().when('role', {
      is: 'developer_admin',
      then: (schema) => schema.required("Developer selection is required for Developer Admin"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Filter roles based on logged-in user's role
  const getAvailableRoles = () => {
    if (loggedInUser?.role === 'system_admin') {
      return [
        { value: 'system_technician', label: 'System Technician' },
        { value: 'developer_admin', label: 'Developer Admin' },
      ];
    }
    if (loggedInUser?.role === 'developer_admin') {
      return [
        { value: 'developer_marketing', label: 'Marketing' },
        { value: 'developer_sales', label: 'Sales' },
      ];
    }
    return [];
  };

  const availableRoles = getAvailableRoles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      developerId: "",
      isActive: true,
      isEmailVerified: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Add developerId for appropriate roles
        const dataToSubmit = { ...values };
        
        // For developer_admin created by system_admin, include the selected developerId
        if (values.role === 'developer_admin' && values.developerId) {
          dataToSubmit.developerId = values.developerId;
        } 
        // For marketing and sales roles created by developer_admin, include their developerId
        else if ((values.role === 'developer_marketing' || values.role === 'developer_sales') && loggedInUser?.developerId) {
          dataToSubmit.developerId = loggedInUser.developerId;
        }
        
        // Remove empty developerId if not applicable
        if (!dataToSubmit.developerId) {
          delete dataToSubmit.developerId;
        }
        
        await onSuccess(dataToSubmit);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
        <input
          type="text"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          placeholder="Enter name"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-400 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
        <input
          type="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          placeholder="Enter email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-400 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="Enter password"
          />
          <button
            type="button"
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#eff0f1",
              padding: 4,
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-400 text-sm mt-1">{formik.errors.password}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Role</label>
        <select
          name="role"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.role}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
        >
          <option value="" disabled className="bg-[#1C1C1C]">Select Role</option>
          {availableRoles.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1C1C1C]">
              {option.label}
            </option>
          ))}
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className="text-red-400 text-sm mt-1">{formik.errors.role}</div>
        )}
      </div>

      {loggedInUser?.role === 'system_admin' && (
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Developer</label>
          <select
            name="developerId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.developerId}
            disabled={formik.values.role === 'system_technician' || !formik.values.role}
            className={`w-full px-3 py-2 border border-white/20 rounded text-white focus:outline-none focus:border-white/40 ${
              formik.values.role === 'system_technician' || !formik.values.role
                ? 'bg-white/5 text-white/50 cursor-not-allowed'
                : 'bg-white/10 focus:outline-none focus:border-white/40'
            }`}
          >
            <option value="" className="bg-[#1C1C1C]">
              {formik.values.role === 'system_technician' ? 'All Developers' : 'Select Developer'}
            </option>
            {!['system_technician', ''].includes(formik.values.role) && developers.map((dev) => (
              <option key={dev.id} value={dev.id} className="bg-[#1C1C1C]">
                {dev.name}
              </option>
            ))}
          </select>
          {formik.touched.developerId && formik.errors.developerId && (
            <div className="text-red-400 text-sm mt-1">{formik.errors.developerId}</div>
          )}
        </div>
      )}

      <div className="flex gap-2 justify-end pt-4 border-t border-white/20">
        <Button
          type="button"
          size="sm"
          onClick={onCancel}
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          className="text-white bg-[#4f6f4f] hover:bg-[#4f6f4f]/80"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

const UserDataTable = ({ data, columns, onCreate, onEdit, onDelete, onRowClick }) => {    
  const { user } = useAuth();
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deletingRowIndex, setDeletingRowIndex] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [developers, setDevelopers] = useState([]);
  const itemsPerPage = 20;

  // Fetch developers list when component mounts (for system_admin)
  const fetchDevelopers = async () => {
    if (user?.role === 'system_admin') {
      try {
        const devs = await developerApi.getAll();
        setDevelopers(devs);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    }
  };

  useEffect(() => {
  fetchDevelopers();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];

  const handleEditClick = (row, rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditedData({ ...row });
  };

  const handleInputChange = (e, accessor) => {
    setEditedData({
      ...editedData,
      [accessor]: e.target.value,
    });
  };

  const handleSave = () => {
    onEdit(editedData);
    setEditingRowIndex(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingRowIndex(null);
    setEditedData({});
  };

  const handleDeleteClick = (rowIndex) => {
    setDeletingRowIndex(rowIndex);
  };

  const handleConfirmDelete = (row) => {
    onDelete(row);
    setDeletingRowIndex(null);
  };

  const handleCancelDelete = () => {
    setDeletingRowIndex(null);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleCreateSuccess = async (newUserData) => {
    if (onCreate) {
      await onCreate(newUserData);
      setIsCreating(false);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        {(user?.role === 'system_admin' || user?.role === 'developer_admin') && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <div className="flex justify-end w-full mb-6">
              <DialogTrigger asChild>
                <Button className="text-white flex items-center gap-2 bg-[#4f6f4f] hover:bg-[#4f6f4f]/80">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px] bg-[#1C1C1C] border-white/20">
              <DialogHeader>
                <DialogTitle className="text-white">Create New User</DialogTitle>
                <DialogDescription className="text-white/70">
                  Add a new user to your database.
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm
                onSuccess={handleCreateSuccess}
                onCancel={handleCancelCreate}
                loggedInUser={user}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-md border border-white/20 bg-[#1C1C1C]/50">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-white/5">
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-white/80 text-center">{column.header}</TableHead>
                ))}
                <TableHead className="text-center text-white/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-white/20 hover:bg-white/5">
                <TableCell colSpan={columns.length + 1} className="text-center text-white/70 py-6">
                  No data to display.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border border-white/20 bg-[#1C1C1C]/50">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-white/5">
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-white/80 text-center">{column.header}</TableHead>
                ))}
                <TableHead className="text-center text-white/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <TableRow
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`border-white/20 ${onRowClick ? "cursor-pointer hover:bg-white/5" : "hover:bg-white/5"}`}
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className="text-white/70 text-center">
                        {column.accessor === 'role' ? getDisplayRole(row[column.accessor], user?.role) : row[column.accessor]}
                      </TableCell>
                    ))}
                    <TableCell className="text-center flex justify-center gap-2">
                      {row.id === user?.id ? (
                        <span className="text-white/70 font-medium">You</span>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleEditClick(row, rowIndex); }} className="mr-2 bg-white/10 border-white/20 text-white hover:bg-white/20 p-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(rowIndex); }} className="bg-[#8B3A3A]/80 hover:bg-[#8B3A3A] p-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Edit Row - Collapsed/Expanded */}
                  {editingRowIndex === rowIndex && (
                    <TableRow className="border-white/20 bg-white/5 hover:bg-white/5">
                      <TableCell colSpan={columns.length + 1} className="p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {columns.map((column, colIndex) => (
                              <div key={colIndex}>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                  {column.header}
                                </label>
                                {column.accessor === 'email' ? (
                                  <input
                                    type="text"
                                    value={editedData[column.accessor] || ''}
                                    disabled
                                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white/50 placeholder-white/30 focus:outline-none cursor-not-allowed"
                                    placeholder={`Enter ${column.header}`}
                                  />
                                ) : column.accessor === 'role' ? (
                                  <select
                                    value={editedData[column.accessor] || ''}
                                    onChange={(e) => handleInputChange(e, column.accessor)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
                                  >
                                    <option value="" disabled>Select {column.header}</option>
                                    {user?.role === 'system_admin' ? (
                                      <>
                                        <option value="system_technician" className="bg-[#1C1C1C]">System Technician</option>
                                        <option value="developer_admin" className="bg-[#1C1C1C]">Developer Admin</option>
                                      </>
                                    ) : user?.role === 'developer_admin' ? (
                                      <>
                                        <option value="developer_marketing" className="bg-[#1C1C1C]">Marketing</option>
                                        <option value="developer_sales" className="bg-[#1C1C1C]">Sales</option>
                                      </>
                                    ) : (
                                      ROLE_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value} className="bg-[#1C1C1C]">
                                          {option.label}
                                        </option>
                                      ))
                                    )}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    value={editedData[column.accessor] || ''}
                                    onChange={(e) => handleInputChange(e, column.accessor)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                    placeholder={`Enter ${column.header}`}
                                  />
                                )}
                              </div>
                            ))}
                            {user?.role === 'system_admin' && editedData.role === 'developer_admin' && (
                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Developer</label>
                                <select
                                  value={editedData.developerId || ''}
                                  onChange={(e) => handleInputChange(e, 'developerId')}
                                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
                                >
                                  <option value="" disabled className="bg-[#1C1C1C]">Select Developer</option>
                                  {developers.map((dev) => (
                                    <option key={dev.id} value={dev.id} className="bg-[#1C1C1C]">
                                      {dev.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 justify-end pt-2 border-t border-white/20">
                            <Button
                              size="sm"
                              onClick={handleCancel}
                              className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              className="text-white"
                              style={{ backgroundColor: '#4F6F4F' }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={deletingRowIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleCancelDelete();
          }
        }}
        title={paginatedData[deletingRowIndex] ? `Delete user "${paginatedData[deletingRowIndex].name}"?` : "Delete user?"}
        onConfirm={() => {
          if (deletingRowIndex !== null) {
            handleConfirmDelete(paginatedData[deletingRowIndex]);
          }
        }}
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 py-3 bg-[#1C1C1C]/50 rounded-md border border-white/20">
          <span className="text-white/70 text-sm">
            Page {currentPage} of {totalPages} • Showing {paginatedData.length} of {data?.length || 0} users
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataTable;
