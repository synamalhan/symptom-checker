# 🧠 AI-Powered Symptom Checker

This is a Streamlit web app that uses a machine learning model to predict possible diseases based on user-selected symptoms. It also provides precautionary advice and disease descriptions.

---

## 🚀 Features

- Select symptoms from a sidebar input
- ML model suggests top 3 possible conditions with confidence scores
- Shows disease descriptions and precautions
- Bar chart visualization of top 10 disease confidences
- Beautiful UI with modular layout and custom styling

---

## 🛠️ Tech Stack

- **Frontend**: Streamlit (Python)
- **ML Model**: RandomForestClassifier (scikit-learn)
- **Data**: CSV datasets for symptoms, precautions, and disease descriptions

---

## 🗂️ Project Structure

```
├── app.py                  # Main Streamlit app
├── model.pkl               # Trained ML model
├── symptom_list.pkl        # List of all possible symptoms
├── Disease precaution.csv  # CSV with 4 precautions per disease
├── disease_description.csv # CSV with textual disease descriptions
├── requirements.txt        # Python dependencies
└── README.md               # Project overview
```

---

## ▶️ Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/symptom-checker.git
    cd symptom-checker
    ```

2. **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```

3. **Run the app**
    ```bash
    streamlit run app.py
    ```

---

## 📊 Dataset Sources

- **Symptom-Disease mapping**: Publicly available structured dataset
- **Precautions & Descriptions**: Curated manually / from healthcare datasets

---

## 🙋‍♀️ Author

**Syna Malhan**  
Computer Science @ Arizona State University  
[LinkedIn](#) · [GitHub](#)

---

## 📄 License

This project is open-source and free to use under the MIT License.
