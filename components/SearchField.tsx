"use client";
import React, { useState, useRef } from "react";
import { SearchResult } from "@/types/Search";
import { useOnClickOutside } from "usehooks-ts";
import Spinner from "./Spinner";
import { useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export type State = {
  value: string;
  results: SearchResult[];
  loading: boolean;
};

type Action =
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_RESULTS"; payload: SearchResult[] }
  | { type: "LOADING"; payload: boolean };

const SearchField = () => {
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { value, results, loading } = state;
  const router = useRouter();

  useOnClickOutside(ref, () => setFocus(false));

  const onChange = (value: string) => {
    dispatch({ type: "SET_VALUE", payload: value });
    if (value.length >= 3) {
      dispatch({ type: "LOADING", payload: true });
      axios
        .get<SearchResult[]>("/api/stock", { params: { search: value } })
        .then((response) => {
          dispatch({ type: "SET_RESULTS", payload: response.data });
          dispatch({ type: "LOADING", payload: false });
        })
        .catch((error) => {
          toast(error.message, { type: "error" });
          dispatch({ type: "LOADING", payload: false });
        });
    } else dispatch({ type: "SET_RESULTS", payload: [] });
  };

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
            setFocus(false);
            router.push(`/?search=${value}`);
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
              {results.slice(0, 5).map((result, i) => (
                <li
                  key={`${i}-${result.ticker}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/${result.ticker}`)}
                >
                  {result.ticker} - {result.name}
                </li>
              ))}
              {results.length > 5 && (
                <li
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState: State = {
  value: "",
  results: [],
  loading: false,
};

export default SearchField;
