import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const AdminDataTable = ({ data, columns, onEdit, onDelete, onRowClick }) => {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? "cursor-pointer" : ""}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.accessor]}</TableCell>
              ))}
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(row); }} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(row); }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDataTable;
