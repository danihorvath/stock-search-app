import SearchField from "@/components/SearchField";
import { SearchResponse, SearchResult } from "@/types/Search";
import CardList from "@/components/CardList";
import PageHeader from "@/components/PageHeader";
import { useSearchParams } from "next/navigation";

export type HomePageParams = {
  searchParams: { search: string };
};

async function getData(search: string): Promise<SearchResponse> {
  const response = await fetch(`${process.env.URL}/api/stock?search=${search}`);
  return response.json();
}

export default async function Home({
  searchParams: { search },
}: HomePageParams) {
  const results = search ? await getData(search) : null;
  return (
    <main className="text-black">
      <PageHeader title="Search Stocks">
        <SearchField />
      </PageHeader>
      {results && <CardList results={results} value={search} />}
    </main>
  );
}
