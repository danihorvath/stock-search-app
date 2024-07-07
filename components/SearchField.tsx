"use client";
import React, { useState, useRef } from "react";
import { SearchResult } from "@/types/Search";
import { useOnClickOutside } from "usehooks-ts";
import Spinner from "./Spinner";

type SearchFieldProps = {
  value: string;
  results: SearchResult[];
  onChange: (value: string) => void;
  showCards: (value: boolean) => void;
  loading: boolean;
};

const SearchField = ({
  value,
  results,
  onChange,
  showCards,
  loading,
}: SearchFieldProps) => {
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setFocus(false));

  return (
    <div className="w-full relative" ref={ref}>
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
          onFocus={() => setFocus(true)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => {
            showCards(true);
            setFocus(false);
          }}
        >
          Search
        </button>
      </div>

      {focus && value.length >= 3 && (
        <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md absolute w-full">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {results.slice(0, 5).map((result) => (
                <li key={result.ticker} className="px-4 py-2 hover:bg-gray-100">
                  {result.ticker} - {result.name}
                </li>
              ))}
              {results.length > 5 && (
                <li
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    showCards(true);
                    setFocus(false);
                  }}
                >
                  Show all results ({results.length})
                </li>
              )}
              {!results.length && (
                <li className="px-4 py-2 bg-gray-200">No results. :(</li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
