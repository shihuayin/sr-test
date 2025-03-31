import React from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import TrendChart from "./components/TrendChart";
import Cards from "./components/Cards";
import DataTable from "./components/DataTable";

function App() {
  return (
    <div className="bg-[#0B1D35] min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Filters />
        <Cards />
        <TrendChart />
        <DataTable />
      </main>
    </div>
  );
}

export default App;
