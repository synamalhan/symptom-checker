import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  disease: string;
  confidence: number;
}

export default function ConfidenceChart({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-xl mt-4">
      <h2 className="text-xl font-semibold mb-3">
        Confidence Distribution (Top 10)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="disease" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="confidence" fill="#2E86AB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
