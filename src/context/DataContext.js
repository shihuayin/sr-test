import React, { createContext, useState, useEffect } from "react";
import { fetchProductBenchmarks, fetchExchangeRates } from "../services/api.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [benchmarks, setBenchmarks] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("Globex Brokers");
  const [selectedYear, setSelectedYear] = useState("all");
  // const [selectedCurrency] = useState("EUR");

  //load data from api
  useEffect(() => {
    async function loadData() {
      try {
        //product_benchmarks
        const productData = await fetchProductBenchmarks();
        //exchange_rates
        const rateData = await fetchExchangeRates();

        setBenchmarks(productData.product_benchmarks);
        setExchangeRates(rateData.exchange_rates);
      } catch (error) {
        console.error("Error loading data : ", error);
      }
    }
    loadData();
  }, []);

  //money convert
  const convertAmount = (amount, currencyId, year) => {
    // (1) if eur return directly
    if (currencyId === 3) return amount;

    //(2) if not eur, find exchangrate
    const exchange = exchangeRates.find(
      (er) =>
        //use currencyId and year to find exchange
        er.from_currency_id === currencyId && er.year === parseInt(year)
    );

    // return moneny
    return Math.round(amount * exchange.exchange_rate);
  };

  // selector
  const filteredData = benchmarks
    .filter((item) => {
      const matchProvider = item.provider_name === selectedProvider;
      const matchYear = selectedYear === "all" || item.year === selectedYear;
      return matchProvider && matchYear;
    })
    // convert  selected data, both payment and benchmark
    .map((item) => {
      //convert payment
      const paymentConverted = convertAmount(
        item.payment,
        item.currency.id,
        item.year
      );
      //convert benchmark
      const benchmarkConverted = convertAmount(
        item.benchmark,
        item.currency.id,
        item.year
      );

      // add converted data
      return {
        ...item,
        payment_converted: paymentConverted,
        benchmark_converted: benchmarkConverted,
        diff_converted: paymentConverted - benchmarkConverted,
      };
    });

  return (
    <DataContext.Provider
      value={{
        benchmarks,
        exchangeRates,
        selectedYear,
        setSelectedYear,
        selectedProvider,
        setSelectedProvider,
        // selectedCurrency,
        filteredData,
        convertAmount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
