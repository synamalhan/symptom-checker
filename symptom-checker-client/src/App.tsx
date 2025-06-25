import { useState } from "react";
import SymptomInput from "./components/SymptomInput";
import PredictionCard from "./components/PredictionCard";
import ConfidenceChart from "./components/ConfidenceChart";
import { fetchPrediction } from "./utils/api";
import SidebarAssistant from "./components/SidebarAssistant";

export default function App() {
  const [results, setResults] = useState<any[]>([]);
  const [chart, setChart] = useState<any[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSubmit = async (symptoms: string[]) => {
    const res = await fetchPrediction(symptoms);
    setResults(res.data.predictions);
    setChart(res.data.confidence_chart);
    setSelectedSymptoms(symptoms); // update for assistant too
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#F7F9FC] text-gray-800">
      {/* Sidebar */}
<aside className="sm:w-[500px] w-full p-6 bg-gradient-to-b from-white to-blue-50 border-r border-blue-100 shadow-md h-fit sm:h-screen sticky top-0 overflow-y-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">🧠 Symptom Checker</h1>
          <p className="text-gray-500 text-sm mt-1 px-2">
            Describe your symptoms to receive possible conditions and care suggestions.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 space-y-4 border border-gray-100">
          <SymptomInput onSubmit={handleSubmit} />
        </div>

        <SidebarAssistant symptoms={selectedSymptoms} />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-4 overflow-y-auto">
        {results.length > 0 && (
          <div className="text-lg font-medium text-green-700 mb-4">
            Possible conditions based on your symptoms:
          </div>
        )}
        {results.map((r, i) => (
          <PredictionCard key={i} {...r} />
        ))}
        {chart.length > 0 && <ConfidenceChart data={chart} />}
      </main>
    </div>
  );
}
