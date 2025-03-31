import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Cards() {
  const { filteredData } = useContext(DataContext);

  const totalPayment = filteredData.reduce(
    (sum, item) => sum + item.payment_converted,
    0
  );

  const totalBenchmark = filteredData.reduce(
    (sum, item) => sum + item.benchmark_converted,
    0
  );

  const totalDiff = filteredData.reduce(
    (sum, item) => sum + item.diff_converted,
    0
  );

  const formatCurrency = (num) => `€${Math.abs(num).toLocaleString()}`;

  // diff>0, pay more than peer, red
  // diff<0, pay less than peer,green
  // diff=0, pay same, gary
  const cardColorClass =
    totalDiff > 0
      ? "bg-red-800"
      : totalDiff < 0
      ? "bg-green-800"
      : "bg-gray-800";

  const statusMessage =
    totalDiff > 0
      ? "You are paying more than your peers"
      : totalDiff < 0
      ? "You are paying less than your peers"
      : "You are paying the same as your peers";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* payment card */}

      <div className="bg-[#162B49] p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-bold text-gray-200 mb-2">Payments</h3>
        <p className="text-3xl font-semibold text-white">
          {formatCurrency(totalPayment)}
        </p>
      </div>
      {/* benchmark  card*/}
      <div className="bg-[#162B49] p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-bold text-gray-200 mb-2">Benchmark</h3>
        <p className="text-3xl font-semibold text-white">
          {formatCurrency(totalBenchmark)}
        </p>
      </div>

      {/* diff  card*/}

      <div className={`${cardColorClass} p-6 rounded-lg shadow-lg text-center`}>
        <h3 className="text-xl font-bold text-gray-200 mb-2">
          Overall +/- Benchmark
        </h3>
        <p className="text-3xl font-semibold text-white">
          {totalDiff > 0
            ? `+${formatCurrency(totalDiff)}`
            : totalDiff < 0
            ? `-${formatCurrency(totalDiff)}`
            : formatCurrency(totalDiff)}
        </p>
        <p className="text-sm text-white mt-1">{statusMessage}</p>
      </div>
    </div>
  );
}

export default Cards;
