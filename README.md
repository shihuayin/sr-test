````markdown
# Substantive Research Test Tech

This is a React-based dashboard for analyzing payment and benchmark data.

## Deployment

The project is deployed on Vercel. Access the live application at: [https://sr-test-plum.vercel.app/](https://sr-test-plum.vercel.app/)

## Features

- **Overview Cards**  
  Display overall payment, benchmark, and their difference. The card colors change automatically based on the difference (red indicates payment higher than the benchmark, green indicates lower, and gray indicates equal).

- **Trend Chart**  
  Uses Recharts to visualize trends in payments and benchmarks by year or product. Users can view trends across all years or focus on a specific year to see the performance of individual products.

- **Detailed Data Table**  
  Lists detailed information for each record and supports exporting data to CSV and PDF for offline analysis.

- **Data Filtering**  
  Allows users to filter data by supplier and year, making it easy to view statistics based on specific criteria.

- **Currency Conversion**  
  Converts all values into Euros using exchange rate data from the API, ensuring data consistency.

## Installation and Running

1. **Clone the project:**

   ```bash
   git clone https://github.com/shihuayin/sr-test.git
   ```
````

2. **Navigate to the project directory and install dependencies:**

   ```bash
   cd sr-test
   npm install
   ```

3. **Start the project:**

   ```bash
   npm start
   ```

4. **Open your browser** and go to [http://localhost:3000](http://localhost:3000) to view the application, or visit the deployed URL at [https://sr-test-plum.vercel.app/](https://sr-test-plum.vercel.app/)

5. **Verify the data (optional):**  
   If you would like to verify the data is correct, I have calculated and merged the data from both APIs into a single CSV file. You can find this CSV in the **Results** folder.

## Repository

Access the source code at: [https://github.com/shihuayin/sr-test](https://github.com/shihuayin/sr-test)

```

```
