# ESG Portfolio Dashboard

An ESG (Environmental, Social, Governance) portfolio tracker that helps investors monitor the sustainability performance of their stock holdings using AI-powered insights from Gemini.

This application provides a dashboard to visualize ESG-related data, compare portfolio performance against benchmarks, and interact with an AI assistant for deeper analysis.

## ✨ Key Features

-   **Manual Portfolio Input**: Easily add and remove stock tickers and the number of shares.
-   **ESG Data Aggregation**: Fetches and displays ESG risk scores (Total, Environmental, Social, Governance) for each holding.
-   **Data Visualization**: Interactive charts, including a Radar Chart for category breakdown and a Bar Chart for comparing holdings.
-   **Portfolio-level Scoring**: Calculates a market-value-weighted ESG score for the entire portfolio.
-   **Benchmark Comparison**: Compares your portfolio's performance against the S&P 500 and major ESG-focused ETFs (ESGU, SUSA).
-   **AI-Powered Insights**: Chat with a Google Gemini-powered assistant that has contextual knowledge of your portfolio to answer questions and provide analysis.
-   **PDF Export**: Generate a professional, multi-page, printable report of your dashboard, complete with charts and tables.
-   **Interactive UI**: Click on the bar chart to highlight the corresponding holding in the portfolio table.

## 💻 Tech Stack

-   **Frontend**: React + TypeScript
-   **Styling**: Tailwind CSS
-   **Data Visualization**: Recharts
-   **AI**: Google Gemini API (`@google/genai`)
-   **Data Source**: Mock ESG and stock price data (simulating a service like Yahoo Finance for demonstration).

## 🚀 Getting Started

### Prerequisites

-   A modern web browser.
-   A Google Gemini API Key for the AI Chat functionality.

### Running Locally

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://your-repository-url/esg-portfolio-dashboard.git
    cd esg-portfolio-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    The AI Chat feature requires a Google Gemini API key. You need to make this key available as an environment variable. Create a `.env.local` file in the root of your project and add your key:

    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

    *Note: In the development environment this project was built in, the API key is injected automatically as `process.env.API_KEY`.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

## 📂 Project Structure

```
/src
├── components/       # Reusable React components (Charts, Tables, Inputs, etc.)
│   ├── BenchmarkComparison.tsx
│   ├── ChatPanel.tsx
│   ├── ESGRadarChart.tsx
│   ├── HoldingsBarChart.tsx
│   ├── HoldingsTable.tsx
│   └── ...
├── services/         # Logic for fetching data and interacting with APIs
│   ├── esgService.ts
│   ├── portfolioService.ts
│   └── geminiService.ts
├── types/            # TypeScript type definitions and interfaces
│   └── index.ts
├── constants.ts      # Static data like test portfolios and benchmark scores
└── App.tsx           # Main application component, state management, and layout
```
