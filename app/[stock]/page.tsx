import PageHeader from "@/components/PageHeader";
import Chart from "@/components/Chart";
import { DetailsResponse } from "@/types/Details";

export type StockPageParams = {
  params: { stock: string };
};

import axios from "axios";

function getData(stock: string): Promise<DetailsResponse> {
  return axios
    .get(`${process.env.URL}/api/stock/${stock}`)
    .then((response) => response.data);
}

export default async function Stock({ params: { stock } }: StockPageParams) {
  const { info, history } = await getData(stock);
  return (
    <main>
      <PageHeader title={info.ticker} subtitle={info.name} goBack="/">
        <p className="text-white mb-8">{info.description}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            `Primary exchange: ${info.primary_exchange}`,
            `Market cap (${info.currency_name.toUpperCase()}): ${
              info.market_cap || "N/A"
            } `,
            `Employees: ${info.total_employees || "N/A"}`,
            `List date: ${info.list_date}`,
          ].map((item) => (
            <div
              key={item}
              className="bg-gray-400 px-4 py-1 shadow-md rounded-md"
            >
              {item}
            </div>
          ))}
        </div>
      </PageHeader>
      <Chart data={history} />
    </main>
  );
}
