import { SearchResult } from "@/types/Search";
import React from "react";
import Link from "next/link";

interface CardListProps {
  results: SearchResult[];
  value: string;
}

const CardList = ({ results, value }: CardListProps) => {
  return (
    <div className="flex justify-center">
      <div className="container my-20 p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Results for &quot;{value}&quot;
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <Link href={`/${result.ticker}`} key={index}>
              <div className="cursor-pointer bg-gray-300 hover:bg-gray-200 p-4 shadow-md rounded-md">
                <div className="bg-blue-500 text-white text-center p-2 mb-2 rounded-md">
                  <h3 className="text-lg font-bold cursor-pointer">
                    {result.ticker}
                  </h3>
                  <p className="text-nowrap	text-ellipsis overflow-hidden cursor-pointer">
                    {result.name}
                  </p>
                </div>

                <p className="cursor-pointer">
                  Locale: {result.locale}
                  <br />
                  Primary Exchange: {result.primary_exchange}
                  <br />
                  Type: {result.type}
                  <br />
                  Currency: {result.currency_name}
                  <br />
                  Last Updated UTC: {result.last_updated_utc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
