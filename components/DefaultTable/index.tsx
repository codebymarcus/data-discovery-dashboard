'use client'

import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DefaultTableProps } from './types'



const DefaultTable = <TData extends { id: string }>({ data, columns, onButtonClick, isLoading }: DefaultTableProps<TData>) => {

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    getRowId: (row) => row.id,
  });

  const handleDeleteClick = async () => {
    const originalIds = Object.keys(rowSelection);
    try {
      onButtonClick?.({
        action: 'delete',
        data: originalIds,
      })

      table.resetRowSelection();
    } catch (error) {
      throw error;
    }
  }

  if (isLoading) {
    return <div className='flex items-center justify-center w-full gap-2'>
      <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> loading
    </div>
  }

  return (
    <>
      <div className='rounded-md border w-full overflow-hidden'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div className='mb-4 flex justify-between items-center w-full'>
          <p className='text-sm'>{Object.keys(rowSelection).length} rows selected.</p>
          <Button variant='destructive' onClick={handleDeleteClick}>Delete</Button>
        </div>
      )}
    </>
  )
}

export default DefaultTable