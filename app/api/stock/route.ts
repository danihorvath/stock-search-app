import axios from "axios";
import { SearchResponse } from "@/types/Search";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return axios
    .get<SearchResponse>(
      `${process.env.POLYGON_API_URL!}/v3/reference/tickers`,
      {
        params: {
          search: searchParams.get("search"),
          active: true,
          market: "stocks",
          apiKey: process.env.POLYGON_API_KEY,
        },
      }
    )
    .then((response) => {
      return Response.json(response.data.results);
    })
    .catch((error) => {
      return Response.json(
        { message: error.response.statusText },
        { status: error.response.status }
      );
    });
}
