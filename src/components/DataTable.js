import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function DataTable() {
  const { filteredData } = useContext(DataContext);
  const formatCurrency = (num) => `€${Math.abs(num).toLocaleString()}`;

  const exportCSV = () => {
    const headers = [
      "Provider",
      "Product",
      "Year",
      "Payment",
      "Benchmark",
      "Difference",
    ];

    const rows = filteredData.map((item) => [
      item.provider_name,
      item.product_name,
      item.year,
      item.payment_converted,
      item.benchmark_converted,
      item.diff_converted,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Detailed Report (EUR)`, 14, 16);
    const headers = [
      ["Provider", "Product", "Year", "Payment", "Benchmark", "Difference"],
    ];
    const data = filteredData.map((item) => [
      item.provider_name,
      item.product_name,
      item.year,
      formatCurrency(item.payment_converted),
      formatCurrency(item.benchmark_converted),
      item.diff_converted >= 0
        ? `+${formatCurrency(item.diff_converted)}`
        : formatCurrency(item.diff_converted),
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
    });
    doc.save("report.pdf");
  };

  return (
    <div className="bg-[#162B49] rounded-lg shadow-lg overflow-x-auto mb-8">
      <div className="px-6 py-4 border-b border-[#223B5D] flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-200">
          Detailed Table (EUR)
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1 border rounded-md bg-[#223B5D] text-gray-200 hover:bg-[#2E4C78]"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="px-3 py-1 border rounded-md bg-[#223B5D] text-gray-200 hover:bg-[#2E4C78]"
          >
            Export PDF
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-[#223B5D]">
        <thead className="bg-[#0B1D35] text-gray-200">
          <tr>
            <th className="px-4 py-3 text-center font-medium">Provider</th>
            <th className="px-4 py-3 text-center font-medium">Product</th>
            <th className="px-4 py-3 text-center font-medium">Year</th>
            <th className="px-4 py-3 text-center font-medium">Payment</th>{" "}
            <th className="px-4 py-3 text-center font-medium">Benchmark</th>
            <th className="px-4 py-3 text-center font-medium">+/- Benchmark</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#223B5D]">
          {filteredData.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-[#1D375B]" : "bg-[#162B49]"}
            >
              <td className="px-4 py-3 text-center text-gray-200">
                {item.provider_name}
              </td>

              <td className="px-4 py-3 text-center text-gray-200">
                {item.product_name}
              </td>

              <td className="px-4 py-3 text-center text-gray-200">
                {item.year}
              </td>

              <td className="px-4 py-3 text-center text-gray-200">
                {formatCurrency(item.payment_converted)}
              </td>

              <td className="px-4 py-3 text-center text-gray-200">
                {formatCurrency(item.benchmark_converted)}
              </td>

              <td
                className={`px-4 py-3 font-semibold text-center ${
                  item.diff_converted > 0
                    ? "text-red-400"
                    : item.diff_converted < 0
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {item.diff_converted > 0
                  ? `+${formatCurrency(item.diff_converted)}`
                  : item.diff_converted < 0
                  ? `-${formatCurrency(item.diff_converted)}`
                  : formatCurrency(item.diff_converted)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
