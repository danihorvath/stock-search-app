"use client";
import React, { useReducer, useEffect, LegacyRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useThrottle, useClickAway } from "@uidotdev/usehooks";

import Button from "./Button";
import Spinner from "./Spinner";
import { SearchResult } from "@/types/Search";

export type State = {
  value: string;
  results: SearchResult[];
  loading: boolean;
  focus: boolean;
};

type Action =
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_RESULTS"; payload: SearchResult[] }
  | { type: "LOADING"; payload: boolean }
  | { type: "FOCUS"; payload: boolean };

const initialState: State = {
  value: "",
  results: [],
  loading: false,
  focus: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "LOADING":
      return { ...state, loading: action.payload };
    case "FOCUS":
      return { ...state, focus: action.payload };
    default:
      return state;
  }
};

const SearchField = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { value, results, loading, focus } = state;
  const throttledValue = useThrottle(value, 1000);
  const ref = useClickAway(() => {
    setFocus(false);
  }) as LegacyRef<HTMLDivElement>;

  const setFocus = (payload: boolean) => dispatch({ type: "FOCUS", payload });
  const setLoading = (payload: boolean) =>
    dispatch({ type: "LOADING", payload });

  const onChange = (value: string) => {
    setLoading(true);
    dispatch({ type: "SET_VALUE", payload: value });
  };

  useEffect(() => {
    if (throttledValue.length >= 3) {
      setLoading(true);
      axios
        .get<SearchResult[]>("/api/stock", {
          params: { search: throttledValue },
        })
        .then((response) => {
          dispatch({ type: "SET_RESULTS", payload: response.data });
          setLoading(false);
        })
        .catch((error) => {
          toast(error.message, { type: "error" });
          setLoading(false);
        });
    } else dispatch({ type: "SET_RESULTS", payload: [] });
  }, [throttledValue]);

  return (
    <div className="relative text-black" ref={ref}>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setFocus(false);
          router.push(`/?search=${value}`);
        }}
      >
        <input
          type="text"
          value={value}
          placeholder="Start typing..."
          className="w-full rounded-md p-2 focus:outline-none focus:ring-2"
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
        />
        <Button type="submit">Search</Button>
      </form>

      {focus && value.length >= 3 && (
        <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-md absolute w-full">
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
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                  onClick={() => {
                    setFocus(false);
                    router.push(`/?search=${value}`);
                  }}
                >
                  Show all results ({results.length})
                </li>
              )}
              {!results.length && (
                <li className="px-4 py-2 text-center">No results. :(</li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
