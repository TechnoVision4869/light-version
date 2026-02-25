export const ROLES = {
  ADMIN: 'admin',
  SYSTEM_ADMIN: 'system_admin',
  SYSTEM_TECHNICIAN: 'system_technician',
  DEVELOPER_ADMIN: 'developer_admin',
  DEVELOPER_MARKETING: 'developer_marketing',
  DEVELOPER_SALES: 'developer_sales',
};

export const ROLE_OPTIONS = Object.values(ROLES).map(role => ({
  value: role,
  label: role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
}));

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const formatRole = (role) => {
  if (!role) return '';
  return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const formatStatus = (status) => {
  return status || '';
};
