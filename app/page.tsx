import Dashboard from "@/app/companies/dashboard";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetMockDataType } from "./api/companies/types";

export const getCompanies = async (props?: GetMockDataType) => {
  const { page = 1, per_page = 5 } = props || {};
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies?page=${page}&per_page=${per_page}`, { cache: 'no-store' });
    const data = await response.json();
    return data;  
  } catch (error) {
    throw error;
  }
}

export default async function Home() {
  const queryClient = new QueryClient();

  const initParams: GetMockDataType = { page: 1 };

  await queryClient.prefetchQuery({
    queryKey: ['companies', initParams],
    queryFn: () => getCompanies(initParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-[90%] sm:w-[70%]">
          <Dashboard />
        </main>
      </div>
    </HydrationBoundary>
  );
}
