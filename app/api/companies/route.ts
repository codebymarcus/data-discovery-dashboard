import path from "path";
import { promises as fs } from 'fs';
import { GetMockDataResponseType, GetMockDataType } from "./types";
import { CompanyType } from "@/app/companies/types";

async function getMockData (props: GetMockDataType): Promise<GetMockDataResponseType> {
  const { page = 1, per_page = 5 } = props;
  const filePath = path.join(process.cwd(), 'mock-data', 'companies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');

  const parsed = JSON.parse(jsonData);

  const start = (page - 1) * per_page;
  const end = start + per_page;
  const data = parsed.slice(start, end);

  return {
    data,
    total_pages: Math.ceil(parsed.length / per_page),
    total_records: parsed.length,
    per_page,
    page
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const per_page = searchParams.get('per_page') ? Number(searchParams.get('per_page')) : 5;

  try {
    const mockData = await getMockData({ page, per_page });
    
    return new Response(JSON.stringify(mockData));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}

async function deleteMockData (ids: string[]): Promise<{ success: boolean, message?: string }> {
  const filePath = path.join(process.cwd(), 'mock-data', 'companies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');

  const parsed = JSON.parse(jsonData);

  const hasActive = parsed.filter((data: CompanyType) => ids.includes(data.id)).find((data: CompanyType) => data.status === 'active');

  if (hasActive) {
    return { success: false, message: 'Cannot delete active companies' };
  }
  

  const newData = parsed.filter((data: CompanyType) => !ids.includes(data.id));

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8');

  return { success: true, message: `${ids.length > 1 ? 'Companies' : 'Company'} deleted successfully` };
}

export async function DELETE(request: Request) {
  try {

    const body = await request.json();

    const { ids } = body;


    if (!ids || ids.length === 0) {
      return new Response(JSON.stringify({ error: 'No ID provided' }), { status: 400 });
    }
    
    const result = await deleteMockData(ids);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.message }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: result.message }));

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), { status: 500 });    
  }
}