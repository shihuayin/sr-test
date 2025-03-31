//fetch data

import axios from "axios";

//Key: auth-key
//Value: 590e3e17b6a26a8fcda726e2a91520e476e2c894
//In: header

const BASE_URL = "https://substantive.pythonanywhere.com";
const AUTH_KEY = "590e3e17b6a26a8fcda726e2a91520e476e2c894";

//get product benchmarks, product_benchmarks

export const fetchProductBenchmarks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product_benchmarks`, {
      headers: {
        "auth-key": AUTH_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product benchamrk", error);
    throw error;
  }
};

//get rate

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/exchange_rates`, {
      headers: {
        "auth-key": AUTH_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rate", error);
    throw error;
  }
};
