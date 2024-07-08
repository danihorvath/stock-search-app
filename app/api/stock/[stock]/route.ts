import axios from "axios";
import moment from "moment";
import polygonAxiosConfig from "@/utils/polygonAxiosConfig";

const from = moment().subtract(2, "month").format("YYYY-MM-DD");
const to = moment().format("YYYY-MM-DD");

export function GET(
  request: Request,
  { params }: { params: { stock: string } }
) {
  const ticker = params.stock.toUpperCase();
  return axios
    .all([
      axios.get(`/v3/reference/tickers/${ticker}`, polygonAxiosConfig),
      axios.get(
        `/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`,
        polygonAxiosConfig
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
