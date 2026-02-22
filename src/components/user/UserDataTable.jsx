import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/use-auth";
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
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  // Filter roles based on logged-in user's role
  const getAvailableRoles = () => {
    if (loggedInUser?.role === 'developer_admin') {
      return [
        { value: 'developer_marketing', label: 'Marketing' },
        { value: 'developer_sales', label: 'Sales' },
      ];
    }
    return ROLE_OPTIONS;
  };

  const availableRoles = getAvailableRoles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      isActive: true,
      isEmailVerified: false,
      password: "securePassword123",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Add developerId for marketing and sales roles
        const dataToSubmit = { ...values };
        if ((values.role === 'developer_marketing' || values.role === 'developer_sales') && loggedInUser?.id) {
          dataToSubmit.developerId = loggedInUser.id;
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
          className="text-white"
          style={{ backgroundColor: '#4F6F4F' }}
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
  const itemsPerPage = 20;

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
        {(user?.role === 'admin' || user?.role === 'developer_admin') && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <div className="flex flex-row justify-between w-full items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Users</h1>
                <Button className="text-white flex items-center gap-2" style={{ backgroundColor: '#4F6F4F' }}>
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
              </div>            
            </DialogTrigger>
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
        {(user?.role !== 'admin' && user?.role !== 'developer_admin') && (
          <h1 className="text-3xl font-bold text-white">Users</h1>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {columns.map((column, colIndex) => (
                              <div key={colIndex}>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                  {column.header}
                                </label>
                                {column.accessor === 'role' ? (
                                  <select
                                    value={editedData[column.accessor] || ''}
                                    onChange={(e) => handleInputChange(e, column.accessor)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
                                  >
                                    <option value="" disabled>Select {column.header}</option>
                                    {user?.role === 'developer_admin' ? (
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
      {deletingRowIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1C1C1C] border border-white/20 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
            <p className="text-white/70 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button
                size="sm"
                onClick={handleCancelDelete}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleConfirmDelete(paginatedData[deletingRowIndex])}
                className="bg-[#8B3A3A] hover:bg-[#A24242] text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

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
