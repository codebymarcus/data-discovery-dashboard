import { CompanyType } from "@/app/companies/types"

export type GetMockDataType = {
  page?: number
  per_page?: number
}

export type GetMockDataResponseType = {
  data: CompanyType[],
  total_pages: number,
  total_records: number,
  per_page: number,
  page: number
}