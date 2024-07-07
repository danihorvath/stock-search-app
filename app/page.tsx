"use client";
import SearchField from "@/components/SearchField";
import { useReducer } from "react";
import { SearchResult } from "@/types/Search";
import CardList from "@/components/CardList";
import { toast } from "react-toastify";

export type State = {
  value: string;
  results: SearchResult[];
  showCards: boolean;
  loading: boolean;
};

type Action =
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_RESULTS"; payload: SearchResult[] }
  | { type: "TOGGLE_CARDS"; payload: boolean }
  | { type: "LOADING"; payload: boolean };

import axios from "axios";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (value: string) => {
    dispatch({ type: "SET_VALUE", payload: value });
    dispatch({ type: "TOGGLE_CARDS", payload: false });
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
    <main className="text-black">
      <div className="flex flex-col items-center justify-between p-20 bg-gray-800">
        <SearchField
          value={state.value}
          results={state.results}
          onChange={onChange}
          showCards={(value) => {
            dispatch({ type: "TOGGLE_CARDS", payload: value });
          }}
          loading={state.loading}
        />
      </div>
      {state.showCards && (
        <CardList results={state.results} value={state.value} />
      )}
    </main>
  );
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "TOGGLE_CARDS":
      return { ...state, showCards: action.payload };
    case "LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState: State = {
  value: "",
  results: [],
  showCards: false,
  loading: false,
};
