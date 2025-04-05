import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TrendChart() {
  //display by year or product
  const { filteredData, selectedYear } = useContext(DataContext);

  let chartData = [];

  // select all year, display by year
  if (selectedYear === "all") {
    const dataByYear = {};
    filteredData.forEach((item) => {
      // if the year not in array
      if (!dataByYear[item.year]) {
        dataByYear[item.year] = { year: item.year, payment: 0, benchmark: 0 };
      }
      // if year in, excute sum
      dataByYear[item.year].payment += item.payment_converted;
      dataByYear[item.year].benchmark += item.benchmark_converted;
    });

    //sort by year
    chartData = Object.values(dataByYear).sort((a, b) => a.year - b.year);
  }
  //select single year
  else {
    // single year , unique product do not need sum， display directly
    chartData = filteredData.map((item) => ({
      product: item.product_name,
      payment: item.payment_converted,
      benchmark: item.benchmark_converted,
    }));
  }

  return (
    <div className="bg-[#162B49] p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-gray-200 mb-4 font-semibold">
        {selectedYear === "all"
          ? "Yearly Trend (EUR)"
          : `Product Trend in ${selectedYear} (EUR)`}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis
            stroke="white"
            dataKey={selectedYear === "all" ? "year" : "product"}
          />
          <YAxis stroke="white" />
          <Tooltip
            formatter={(v) => `€${v.toLocaleString()}`}
            labelFormatter={() => ""}
            contentStyle={{
              backgroundColor: "#1E3A8A",
              padding: "8px",
              borderRadius: "4px",
              maxWidth: "200px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            wrapperStyle={{ maxWidth: "200px" }}
            cursor={{ fill: "transparent", width: 40 }}
          />
          <Legend />
          {/* dataKey ：payment / benchmark */}
          <Bar dataKey="payment" fill="#4ADEDE" barSize={30} />
          <Bar dataKey="benchmark" fill="#64748B" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
