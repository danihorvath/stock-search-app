import axios from "axios";
import { SearchResponse } from "@/types/Search";
import moment from "moment";

const from = moment().subtract(2, "month").format("YYYY-MM-DD");
const to = moment().format("YYYY-MM-DD");

export function GET(
  request: Request,
  { params }: { params: { stock: string } }
) {
  return axios
    .all([
      axios.get<SearchResponse>(
        `${process.env
          .POLYGON_API_URL!}/v3/reference/tickers/${params.stock.toUpperCase()}`,
        {
          params: {
            apiKey: process.env.POLYGON_API_KEY,
          },
        }
      ),
      axios.get<SearchResponse>(
        `${process.env
          .POLYGON_API_URL!}/v2/aggs/ticker/${params.stock.toUpperCase()}/range/1/day/${from}/${to}`,
        {
          params: {
            apiKey: process.env.POLYGON_API_KEY,
          },
        }
      ),
    ])
    .then(
      axios.spread((response1, response2) => {
        return Response.json({
          info: response1.data.results,
          history: response2.data.results,
        });
      })
    )
    .catch((error) => {
      return Response.json(
        { message: error.response.statusText },
        { status: error.response.status }
      );
    });
}
