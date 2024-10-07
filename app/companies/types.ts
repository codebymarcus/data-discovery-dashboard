export type CompanyType = {
  id: string
  name: string
  status: 'active' | 'inactive'
  total_users: number
}

export interface DashboardPropsInterface<TData> {
  data: {
    data: TData[]
    total_records: number
    total_pages: number
    per_page: number
    page: number
  }
}