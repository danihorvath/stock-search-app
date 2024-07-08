# Stock Search App

![](https://raw.githubusercontent.com/danihorvath/stock-search-app/main/screenshots/screencast.gif)

## Running locally

- clone repository
- npm install, npm run dev

## Features

- Using Polygon API to search tickers, get information and historic data
- NextJS framework in Typescript, with proxying third party API
- TailwindCSS for styling
- Responsive design
- Two views with routing: search and details
- Autosuggest on typing, with throttle to limit the number of unnecessary API requests
- Click "Search", press Enter or click "Show all results" to show all results to the typed keyword
- Server side rendering for search results and stock details
- Stock history for the last 2 months presented in candlestick chart (Using Apexchart)
- Showing errors with react-toastify
- Custom error page
- Some unit tests
