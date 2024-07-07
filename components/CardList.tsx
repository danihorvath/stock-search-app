import { SearchResult } from "@/types/Search";
import React from "react";

interface CardListProps {
  results: SearchResult[];
  value: string;
}

const CardList = ({ results, value }: CardListProps) => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Results for "{value}"
      </h2>
      <div className="grid grid-cols-3 gap-4 ">
        {results.map((result, index) => (
          <div key={index} className="bg-gray-300 p-4 shadow-md rounded-md">
            <div className="bg-blue-500 text-white text-center py-2 mb-2 rounded-md">
              <h3 className="text-lg font-bold">{result.ticker}</h3>
              <p>{result.name}</p>
            </div>

            <p>Locale: {result.locale}</p>
            <p>Primary Exchange: {result.primary_exchange}</p>
            <p>Type: {result.type}</p>
            <p>Active: {result.active ? "Yes" : "No"}</p>
            <p>Currency Name: {result.currency_name}</p>
            <p>CIK: {result.cik}</p>
            <p>Composite FIGI: {result.composite_figi}</p>
            <p>Share Class FIGI: {result.share_class_figi}</p>
            <p>Last Updated UTC: {result.last_updated_utc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
