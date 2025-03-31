import React, { createContext, useState, useEffect } from "react";
import { fetchProductBenchmarks, fetchExchangeRates } from "../services/api.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [benchmarks, setBenchmarks] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("Globex Brokers");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCurrency] = useState("EUR");

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

  // currency map
  //from product
  const currencyIdMap = {
    USD: 1,
    GBP: 2,
    EUR: 3,
  };

  //money convert
  const convertAmount = (amount, fromCurrency, year) => {
    // if eur return directly
    if (fromCurrency === "EUR") return amount;

    //if not, get rate first
    // {
    //     from_currency_id: 1,
    //     to_currency_id: 3,
    //     year: 2021,
    //     exchange_rate: 0.82
    //   }
    const exchange = exchangeRates.find(
      (er) =>
        //currencyIdMap[fromCurrency]是根据变量 fromCurrency 的值（例如 "USD"）获取对应的数字 ID（例如 1）
        er.from_currency_id === currencyIdMap[fromCurrency] &&
        er.to_currency_id === currencyIdMap["EUR"] &&
        er.year === parseInt(year)
    );

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
        item.currency.name,
        item.year
      );
      //convert benchmark
      const benchmarkConverted = convertAmount(
        item.benchmark,
        item.currency.name,
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
        selectedCurrency,
        filteredData,
        convertAmount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
