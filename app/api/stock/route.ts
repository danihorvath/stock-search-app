import axios from "axios";
import { SearchResponse } from "@/types/Search";
import polygonAxiosConfig from "@/utils/polygonAxiosConfig";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return axios
    .get<{ results: SearchResponse }>(`/v3/reference/tickers`, {
      ...polygonAxiosConfig,
      params: {
        search: searchParams.get("search"),
        active: true,
        market: "stocks",
      },
    })
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
