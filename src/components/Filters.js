import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Filters() {
  //get data
  const {
    benchmarks,
    selectedProvider,
    setSelectedProvider,
    selectedYear,
    setSelectedYear,
  } = useContext(DataContext);

  //providers
  const providers = Array.from(
    new Set(benchmarks.map((item) => item.provider_name))
  );

  //years

  const years = Array.from(new Set(benchmarks.map((item) => item.year))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  //button style
  const btnClass = (active) =>
    `  px-4 py-2  rounded-md font-medium transition-colors ${
      active
        ? "bg-[#4ADEDE] text-[#0B1D35]"
        : "bg-[#223B5D] text-gray-200 hover:bg-[#2E4C78]"
    }`;

  return (
    <div className="my-6 bg-[#162B49] rounded-md p-4 shadow space-y-4">
      {/* provider */}
      <div className="flex flex-col items-center md:flex-row md:items-center  mb-4 space-y-2 md:space-y-0">
        {/* label */}
        <h4 className="w-full md:w-1/6 text-gray-200  font-semibold">
          PROVIDER
        </h4>
        {/* button */}
        <div className="flex flex-wrap gap-2 w-full md:w-5/6">
          {providers.map((provider) => (
            <button
              key={provider}
              className={btnClass(selectedProvider === provider)}
              onClick={() => setSelectedProvider(provider)}
            >
              {provider}
            </button>
          ))}
        </div>
      </div>

      {/* year*/}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        {/* label */}
        <h4 className="w-full md:w-1/6 text-gray-200  font-semibold">YEAR</h4>
        {/* button */}
        <div className="flex flex-wrap gap-2 w-full md:w-5/6">
          {/* single button "all" */}
          <button
            className={btnClass(selectedYear === "all")}
            onClick={() => setSelectedYear("all")}
          >
            All
          </button>

          {/* map button */}
          {years.map((year) => (
            <button
              key={year}
              className={btnClass(selectedYear === year)}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
