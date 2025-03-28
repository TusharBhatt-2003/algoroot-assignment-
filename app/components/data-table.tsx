import { useTable, useSortBy, usePagination, useGlobalFilter, Column } from 'react-table';
import { useMemo, useState } from 'react';

type DataType = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function DataTable() {
  const [data] = useState<DataType[]>(() => [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // Add more mock data
  ]);

  const columns: Column<DataType>[] = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable<DataType>(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* ... same JSX as before ... */}
    </div>
  );
}