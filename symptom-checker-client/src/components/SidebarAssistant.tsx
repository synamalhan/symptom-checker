import { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface Props {
  symptoms: string[];
}

export default function SidebarAssistant({ symptoms }: Props) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (symptoms.length === 0) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3",
        prompt: `I have these symptoms: ${symptoms.join(
          ", "
        )}. Help me prepare how to describe them to a doctor and what precautions I should take while waiting.`,
        stream: false,
      });

      setResponse(res.data.response.trim());
    } catch (err) {
      setResponse("⚠️ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">💬 Symptom Assistant</h2>
      <p className="text-sm text-gray-600 mb-3">
        Get guidance on explaining your symptoms to a doctor and basic precautions.
      </p>

      <button
        onClick={handleGenerate}
        disabled={loading || symptoms.length === 0}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded transition disabled:opacity-50"
      >
        <Send size={16} />
        {loading ? "Loading..." : "Generate Care Plan"}
      </button>

      {symptoms.length === 0 && (
        <p className="text-xs text-gray-400 mt-1">Select symptoms above first.</p>
      )}

      {response && (
        <div className="mt-4 text-sm bg-blue-50 border border-blue-100 p-4 rounded-lg max-h-96 overflow-y-auto prose prose-sm prose-blue">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
