import axios from "axios";
import { Info, History } from "@/types/Details";
import moment from "moment";

const from = moment().subtract(2, "month").format("YYYY-MM-DD");
const to = moment().format("YYYY-MM-DD");

export function GET(
  request: Request,
  { params }: { params: { stock: string } }
) {
  const ticker = params.stock.toUpperCase();
  return axios
    .all([
      axios.get(
        `${process.env.POLYGON_API_URL!}/v3/reference/tickers/${ticker}`,
        {
          params: {
            apiKey: process.env.POLYGON_API_KEY,
          },
        }
      ),
      axios.get(
        `${process.env
          .POLYGON_API_URL!}/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`,
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
