import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Load CSV
df = pd.read_csv("DiseaseAndSymptoms.csv")

# Normalize symptom text and collect unique symptoms
all_symptoms = pd.unique(df.loc[:, 'Symptom_1':'Symptom_17'].values.ravel())
all_symptoms = [s.strip().lower().replace(' ', '_') for s in all_symptoms if isinstance(s, str)]
unique_symptoms = sorted(set(all_symptoms))

# One-hot encoding for symptoms
binary_df = pd.DataFrame(0, index=df.index, columns=unique_symptoms)
for i in range(1, 18):
    col = f"Symptom_{i}"
    df[col] = df[col].astype(str).str.strip().str.lower().str.replace(' ', '_')
    binary_df = binary_df.mask(df[col].notna(), binary_df.add(pd.get_dummies(df[col]), fill_value=0))

# Binary conversion
binary_df = (binary_df > 0).astype(int)

# Add target
binary_df['Disease'] = df['Disease'].str.strip()

# Split features and labels
X = binary_df.drop("Disease", axis=1)
y = binary_df["Disease"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

# Train classifier
clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save model
joblib.dump(clf, "model.pkl")
print("✅ Model saved as model.pkl")

joblib.dump(X.columns.tolist(), "symptom_list.pkl")
print("✅ Symptom list saved as symptom_list.pkl")