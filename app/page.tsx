import SearchField from "@/components/SearchField";
import { SearchResponse, SearchResult } from "@/types/Search";
import CardList from "@/components/CardList";
import PageHeader from "@/components/PageHeader";
import axios from "axios";

export type HomePageParams = {
  searchParams: { search: string };
};

function getData(search: string): Promise<SearchResponse> {
  return axios
    .get(`${process.env.URL}/api/stock?search=${search}`)
    .then((response) => response.data);
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
