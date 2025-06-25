import { motion } from "framer-motion";

interface Props {
  disease: string;
  confidence: number;
  description?: string;
  precautions: string[];
}

export default function PredictionCard({
  disease,
  confidence,
  description,
  precautions,
}: Props) {
  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-blue-600">
        {disease} ({(confidence * 100).toFixed(2)}%)
      </h3>
      <p className="mt-2 text-gray-700">
        {description || "No description available."}
      </p>
      <ul className="mt-3 text-sm text-gray-600">
        {precautions?.length > 0
          ? precautions.map((p, i) => <li key={i}>• {p}</li>)
          : "No precautions found."}
      </ul>
    </motion.div>
  );
}
