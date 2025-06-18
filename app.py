import streamlit as st
import pandas as pd
import joblib

# --- Load Assets ---
model = joblib.load("model.pkl")
all_symptoms = joblib.load("symptom_list.pkl")
precaution_df = pd.read_csv("Disease precaution.csv")

precaution_map = {
    row['Disease'].strip(): [row[f'Precaution_{i}'] for i in range(1, 5) if pd.notna(row[f'Precaution_{i}'])]
    for _, row in precaution_df.iterrows()
}

description_df = pd.read_csv("disease_description.csv")

# Create a mapping for fast lookup
description_map = dict(zip(description_df['Disease'].str.strip(), description_df['Description']))

# --- Custom Styling ---
st.set_page_config(page_title="Symptom Checker", page_icon="🧬", layout="centered")
st.markdown(
    """
    <style>
        .main { background-color: #F7F9FC; }
        h1 { color: #2E86AB; }
        .stButton>button {
            background-color: #2E86AB;
            color: white;
            border-radius: 8px;
            height: 3em;
            width: 100%;
            font-size: 1.1em;
        }
    </style>
    """, unsafe_allow_html=True
)

# --- Helper Functions ---
def get_predictions(symptoms):
    input_vector = [1 if symptom in symptoms else 0 for symptom in all_symptoms]
    df = pd.DataFrame([input_vector], columns=all_symptoms)
    probs = model.predict_proba(df)[0]
    top_indices = probs.argsort()[-3:][::-1]
    top_predictions = [(model.classes_[i], probs[i]) for i in top_indices]
    return top_predictions, probs

def display_precautions(disease):
    st.markdown("#### 🛡️ Precautions:")
    if disease in precaution_map:
        for p in precaution_map[disease]:
            st.markdown(f"- {p}")
    else:
        st.info("No precautions available.")

def display_description(disease):
    st.markdown("#### 📄 Description:")
    desc = description_map.get(disease)
    if desc:
        st.markdown(f"> {desc}")
    else:
        st.info("No description available.")

# --- Sidebar ---
st.sidebar.title("🩺 Symptom Input")
selected = st.sidebar.multiselect(
    "Select symptoms you're experiencing:",
    options=all_symptoms,
    help="Scroll or search to find symptoms"
)
check_button = st.sidebar.button("🔍 Check My Condition")

# --- Main Content ---
st.title("🧠 AI-Powered Symptom Checker")
st.write("Describe your symptoms and get possible medical conditions with care advice.")

if check_button:
    if not selected:
        st.warning("Please select at least one symptom.")
    else:
        st.success("Here are the possible conditions based on your symptoms:")

        preds, prob_vector = get_predictions(selected)

        for i, (disease, confidence) in enumerate(preds, 1):
            with st.expander(f"{i}. {disease} — {confidence*100:.2f}%"):
                st.markdown(f"**Prediction Confidence:** `{confidence*100:.2f}%`")
                display_description(disease)
                display_precautions(disease)

        # Confidence Bar Chart
        st.markdown("### 📊 Confidence Distribution (Top 10)")
        prob_df = pd.DataFrame({
            "Disease": model.classes_,
            "Confidence": prob_vector
        }).sort_values(by="Confidence", ascending=False).head(10)
        st.bar_chart(prob_df.set_index("Disease"))

# --- Footer ---
st.markdown("---")
