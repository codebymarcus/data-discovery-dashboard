import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CompanyType } from '@/app/companies/types';
import DefaultTable from '.';

const MOCK_COLUMNS: ColumnDef<CompanyType>[] = [
  {
    id: 'select',
    header: () => <div>Select</div>,
    cell: () => <div>Checkbox</div>,
  },
  {
    id: 'name',
    header: 'Company',
    cell: (info) => info.getValue(),
  },
  {
    id: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
  },
  {
    id: 'total_users',
    header: 'Number of Users',
    cell: (info) => info.getValue(),
  },
];

const MOCK_DATA: CompanyType[] = [
  {
    id: '1',
    name: "Company A",
    status: "active",
    total_users: 10
  },
];

describe('DefaultTable', () => {
  it('renders the table with correct headers', () => {
    render(<DefaultTable data={MOCK_DATA} columns={MOCK_COLUMNS} isLoading={false} />);

    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Number of Users')).toBeInTheDocument();
  });

  it(`renders table's loading state`, () => {
    render(<DefaultTable data={MOCK_DATA} columns={MOCK_COLUMNS} isLoading={true} />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });
})