'use client'

import { useState } from 'react'
import { CompanyType } from './types'
import { createColumnHelper } from '@tanstack/react-table';
import DefaultTable from '@/components/DefaultTable';
import Pagination from '@/components/Pagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCompanies } from '../page';
import { GetMockDataResponseType, GetMockDataType } from '../api/companies/types';
import { DefaultTableButtonClickParamsType } from '@/components/DefaultTable/types';
import { useToast } from '@/hooks/use-toast';
import HeaderCheckbox from '@/components/DefaultTable/header-checkbox';
import RowCheckbox from '@/components/DefaultTable/row-checkbox';

const columnHelper = createColumnHelper<CompanyType>();

const deleteCompanies = (ids: string[]) => {
  try {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    })

    return response;
  } catch (error) {
    throw error
  }
}

const defaultColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => {
      return (
        <div className='flex items-center justify-center'>
          <HeaderCheckbox table={table} />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-center'>
          <RowCheckbox row={row} />
        </div>
      )
    },
  }),
  columnHelper.accessor('name', {
    header: 'Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('total_users', {
    header: 'Number of Users',
    cell: info => info.getValue(),
  })
];
export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [params, setParams] = useState<GetMockDataType>({
    page: 1,
  });
   const { data, isLoading, refetch } = useQuery({
    queryKey: ['companies', params],
    queryFn: () => getCompanies(params),
   });

   const { mutateAsync } = useMutation({
    mutationFn: (ids: string[]) => deleteCompanies(ids),
   });

  const handlePageChange = (page: number) => {
    setParams({ page });
  }

  const { data: list, total_pages, page }: GetMockDataResponseType = data || {};

  const handleButtonClick = async (params: DefaultTableButtonClickParamsType) => {
    const { action, data } = params;
    
    if (action === 'delete') {
      const response = await mutateAsync(data as string[]);
      const result = await response.json();

      if (result.error) {
        toast({
          variant: 'destructive',
          description: result.error,
        });

        throw result.error;
      }

      toast({
        description: result.message,
      });
      queryClient.resetQueries({
        queryKey: ['companies'],
      })
      refetch();
      return;
    }
  }

  return (
    <>
      <h1 className='text-3xl font-bold'>Data Discovery Dashboard</h1>
      <DefaultTable
        data={list || []}
        columns={defaultColumns}
        onButtonClick={handleButtonClick}
        isLoading={isLoading} />
      {list?.length === 0 && <div className='flex items-center justify-center w-full'><p>No data</p></div>}
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={total_pages} />
    </>
  )
}