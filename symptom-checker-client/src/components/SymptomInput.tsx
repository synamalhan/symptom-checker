import React, { useEffect, useState } from "react";
import axios from "axios";
import Select, { MultiValue } from "react-select";

interface Props {
  onSubmit: (symptoms: string[]) => void;
}

interface Option {
  label: string;
  value: string;
}

export default function SymptomInput({ onSubmit }: Props) {
  const [symptomOptions, setSymptomOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/symptoms").then((res) => {
      const options = res.data.symptoms.map((s: string) => ({
        label: s,
        value: s,
      }));
      setSymptomOptions(options);
    });
  }, []);

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = () => {
    const selectedSymptoms = selectedOptions.map((opt) => opt.value);
    onSubmit(selectedSymptoms);
  };

  return (
 
  <div className="flex flex-col gap-4">
    <label className="font-medium text-gray-700">Select Symptoms:</label>
    <Select
      options={symptomOptions}
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Search and select symptoms..."
      className="text-sm"
      classNamePrefix="select"
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: 8,
          borderColor: "#d1d5db",
          boxShadow: "none",
          minHeight: 42,
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#DBEAFE",
          color: "#1D4ED8",
        }),
      }}
    />

    <button
      onClick={handleSubmit}
      className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Check My Condition
    </button>
  </div>
);


}
