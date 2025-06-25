import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const fetchSymptoms = () => axios.get(`${API_BASE}/symptoms`);
export const fetchPrediction = (symptoms: string[]) =>
  axios.post(`${API_BASE}/predict`, { symptoms });
