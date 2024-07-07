"use client";
import { History } from "@/types/Details";
import { useEffect, useMemo } from "react";
import lineWithCandleStick from "@/utils/chartConfigs/lineWithCandleStick";

const GRAPH_ID = "line-with-candlestick";

interface ChartProps {
  data: History[];
}

const Component = ({ data }: ChartProps) => {
  const options = useMemo(
    () => ({
      ...lineWithCandleStick,
      series: [
        {
          type: "line",
          data: [
            [data[0].t, data[0].c],
            [data[data.length - 1].t, data[data.length - 1].c],
          ],
        },
        {
          type: "candlestick",
          data: data.map((item) => [item.t, item.o, item.h, item.l, item.c]),
        },
      ],
    }),
    [data]
  );

  useEffect(() => {
    (async () => {
      const ApexCharts = (await import("apexcharts")).default;
      const chart = new ApexCharts(document.getElementById(GRAPH_ID), options);
      chart.render();
    })();
  }, [options]);

  return (
    <div className="flex flex-col items-center justify-center p-16 m-12 bg-gray-800 shadow-md rounded-lg">
      <h3 className="text-2xl text-white mb-10">Historical Stock Prices</h3>
      <div id={GRAPH_ID} className="w-full"></div>
    </div>
  );
};

export default Component;
