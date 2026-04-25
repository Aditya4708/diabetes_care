# 🩺 DiabetesCare — AI-Powered Diabetes Risk Predictor

> An AI Lab Mini Project — Full Stack Web Application using React, Node.js, Python & Machine Learning

![DiabetesCare](https://img.shields.io/badge/DiabetesCare-AI%20Health%20App-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs)
![Python](https://img.shields.io/badge/Python-3.13-3776ab?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## 📌 Project Overview

**DiabetesCare** is a machine learning-powered web application that predicts a person's risk of developing diabetes based on 8 basic health metrics. The system uses a **Logistic Regression model** trained on the **PIMA Indian Diabetes Dataset**, combined with **OpenRouter AI** for personalized health recommendations.

### Real-World Use Cases
- 🏥 **Primary care clinics** — Assists doctors in identifying at-risk patients
- 🌍 **Community health screenings** — Quick, low-cost preliminary risk assessment
- 📱 **Personal health monitoring** — Helps individuals understand their risk factors

---

## 🏗️ Project Architecture

```
diabetescare/
├── frontend/          ← Vite + React 19 (port 5173)
├── backend/           ← Node.js + Express 5 (port 5000)
└── ml/                ← Python + FastAPI (port 8000)
```

### Data Flow
```
User Input (8 metrics)
    ↓
React Frontend (Vite)
    ↓ REST API
Node.js Backend (Express)
    ↓ HTTP /predict
Python ML Service (FastAPI)
    ↓ Returns prediction + probability
Node.js saves to MongoDB Atlas
    ↓
Results displayed to user
    ↓
OpenRouter AI generates recommendations
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| Vite | Latest | Build Tool |
| Tailwind CSS | 3 | Styling |
| shadcn/ui | Latest | UI Components |
| Framer Motion | Latest | Animations |
| React Router | v7 | Navigation |
| Axios | Latest | HTTP Client |
| React Query | v5 | Server State |
| Lucide React | Latest | Icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22 | Runtime |
| Express | 5 | Web Framework |
| Mongoose | 9 | MongoDB ODM |
| JWT | 9 | Authentication |
| bcryptjs | 3 | Password Hashing |
| Axios | Latest | ML Service Calls |
| Morgan | Latest | HTTP Logger |
| Nodemon | Latest | Dev Server |

### ML Service
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.13 | Runtime |
| FastAPI | Latest | API Framework |
| scikit-learn | 1.3.0 | ML Model |
| Pandas | 2.0.3 | Data Processing |
| NumPy | 1.24.3 | Numerical Computing |
| Joblib | 1.3.2 | Model Serialization |
| Uvicorn | Latest | ASGI Server |

### Database & AI
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud Database |
| OpenRouter API | Health Recommendations |

---

## 📊 Dataset

**PIMA Indian Diabetes Dataset** — sourced from the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)

| Property | Details |
|---|---|
| Total Records | 768 patient records |
| Positive Cases | 268 (34.9%) — Diabetes diagnosed |
| Negative Cases | 500 (65.1%) — No diabetes |
| Demographics | Female patients, Pima Indian heritage, aged 21+ |

### Input Features (8 Health Metrics)
| Feature | Description | Unit |
|---|---|---|
| Pregnancies | Number of times pregnant | Count |
| Glucose | Plasma glucose concentration (2hr OGTT) | mg/dL |
| BloodPressure | Diastolic blood pressure | mm Hg |
| SkinThickness | Triceps skin fold thickness | mm |
| Insulin | 2-Hour serum insulin | μU/ml |
| BMI | Body mass index | kg/m² |
| DiabetesPedigreeFunction | Diabetes family history score | Score |
| Age | Age of patient | Years |

---

## 🤖 ML Model Performance

| Metric | Score | Target |
|---|---|---|
| Accuracy | 70.78% | >70% |
| Precision | 60.00% | >60% |
| Recall | 50.00% | >50% |
| F1 Score | 54.55% | >50% |
| ROC-AUC | 0.813 | >0.80 |

**Model:** Logistic Regression  
**Preprocessing:** StandardScaler (feature normalization)  
**Train/Test Split:** 80% / 20%  
**Output:** Binary classification (0 = Low Risk, 1 = High Risk) + Probability Score

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/diabetescare.git
cd diabetescare
```

### 2. Setup ML Service
```bash
cd ml

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Train the model (generates model.pkl and scaler.pkl)
python train_model.py

# Start the ML service
uvicorn app:app --reload --port 8000
```

### 3. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your MongoDB URI and JWT secret

# Start the backend
npm run dev
```

### 4. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start the frontend
npm run dev
```

### 5. Open the App
```
http://localhost:5173
```

---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/diabetescare
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:8000
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📁 Project Structure

```
diabetescare/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js          ← Axios instance with JWT interceptor
│   │   │   ├── auth.js           ← Auth API calls
│   │   │   ├── predict.js        ← Prediction API calls
│   │   │   └── history.js        ← History API calls
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx    ← Sticky navbar with mobile menu
│   │   │   │   └── Footer.jsx    ← Animated footer
│   │   │   ├── ui/
│   │   │   │   ├── sparkles.jsx  ← Particle animation (21st.dev)
│   │   │   │   ├── button.tsx    ← shadcn button
│   │   │   │   ├── Loader.jsx    ← Loading spinner
│   │   │   │   └── PrivateRoute.jsx ← Auth guard
│   │   │   └── charts/
│   │   │       ├── FeatureChart.jsx
│   │   │       └── RiskGauge.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   ← Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx          ← Landing page with sparkles
│   │   │   ├── Login.jsx         ← Sign in page
│   │   │   ├── Register.jsx      ← Sign up page
│   │   │   ├── Predict.jsx       ← 8-slider prediction form
│   │   │   ├── Results.jsx       ← Risk results + AI advice
│   │   │   ├── History.jsx       ← Past predictions dashboard
│   │   │   └── About.jsx         ← Project documentation
│   │   ├── App.jsx               ← Routes + layout
│   │   └── main.jsx              ← Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                 ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     ← Register, login, getMe
│   │   ├── predictController.js  ← Calls ML service, saves result
│   │   ├── historyController.js  ← CRUD for predictions
│   │   └── aiController.js       ← AI recommendations
│   ├── middleware/
│   │   ├── authMiddleware.js     ← JWT verification
│   │   └── errorMiddleware.js    ← Global error handler
│   ├── models/
│   │   ├── User.js               ← User schema
│   │   └── Prediction.js         ← Prediction schema
│   ├── routes/
│   │   ├── authRoutes.js         ← /api/auth
│   │   ├── predictRoutes.js      ← /api/predict
│   │   ├── historyRoutes.js      ← /api/history
│   │   └── aiRoutes.js           ← /api/ai
│   ├── server.js                 ← Express entry point
│   ├── .env                      ← Environment variables
│   └── package.json
│
└── ml/
    ├── models/
    │   ├── model.pkl             ← Trained LR model (generated)
    │   └── scaler.pkl            ← StandardScaler (generated)
    ├── train_model.py            ← Train + evaluate + save model
    ├── app.py                    ← FastAPI server + /predict endpoint
    ├── diabetes.csv              ← PIMA dataset
    ├── requirements.txt          ← Python dependencies
    └── venv/                     ← Virtual environment
```

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Predict Routes (`/api/predict`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/predict` | Run prediction | ✅ |

### History Routes (`/api/history`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/history` | Get all predictions | ✅ |
| GET | `/api/history/:id` | Get single prediction | ✅ |
| DELETE | `/api/history/:id` | Delete prediction | ✅ |

### AI Routes (`/api/ai`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/ai/recommend` | Get AI recommendations | ✅ |

### ML Service Routes (`localhost:8000`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Service info |
| GET | `/health` | Health check |
| POST | `/predict` | Run ML prediction |
| GET | `/docs` | Interactive API docs |

---

## 🖥️ App Pages

| Page | Route | Auth Required |
|---|---|---|
| Home | `/` | ❌ |
| Login | `/login` | ❌ |
| Register | `/register` | ❌ |
| About | `/about` | ❌ |
| Predict | `/predict` | ✅ |
| Results | `/results` | ✅ |
| History | `/history` | ✅ |

---

## 🔮 Future Enhancements

- [ ] Deep Learning model for higher accuracy
- [ ] PDF report download
- [ ] Mobile app (React Native)
- [ ] Doctor dashboard
- [ ] Wearable device integration
- [ ] Multi-language support
- [ ] Email notifications for high-risk users

---

## 📚 References

1. [PIMA Indians Diabetes Database — Kaggle](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)
2. [Scikit-learn Documentation](https://scikit-learn.org)
3. [FastAPI Documentation](https://fastapi.tiangolo.com)
4. [React Documentation](https://react.dev)
5. [WHO — Diabetes Facts](https://www.who.int/health-topics/diabetes)
6. [NIDDK — National Institute of Diabetes](https://www.niddk.nih.gov)

---

## 👥 Project Team

| Member | Role |
|---|---|
| Team Member 1 | ML Engineer |
| Team Member 2 | Backend Developer |
| Team Member 3 | Frontend Developer |
| Team Member 4 | Data Analyst |

**Course:** Artificial Intelligence Laboratory  
**Institution:** [Your Institution Name]  
**Date:** March 2026

---

## ⚠️ Disclaimer

> This application is for **educational purposes only**. It is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions.

---

<div align="center">
  Built with ❤️ using React, Node.js, Python & OpenRouter AI
</div>