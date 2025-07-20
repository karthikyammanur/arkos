<div align="center">

# 🌱 Arkos - AI-Powered Energy Analytics Platform

_Democratizing energy optimization through intelligent analytics_

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6.svg)](https://www.typescriptlang.org/)

[🚀 Get Started](#setup-) • [📋 Features](#-features) • [🛠️ Tech Stack](#️-technology-stack) • [👥 Team](#-team--contributors)

</div>

---

## 🎯 Overview

**Arkos** is an intelligent energy analytics and advisory platform designed to help households and small businesses reduce energy costs and optimize consumption patterns through cutting-edge AI-driven insights. Our mission is to make advanced energy optimization tools accessible to everyone, regardless of technical expertise or economic background.

## 🎥 Demo Video

<div align="center">
  <a href="https://www.youtube.com/watch?v=3TiOBKwIfVY">
    <img src="https://img.youtube.com/vi/3TiOBKwIfVY/maxresdefault.jpg" alt="Arkos Demo Video" width="600">
  </a>
  <br>
  <em>Click the image above to watch our demo video showcasing Arkos in action!</em>
</div>

## 💡 Inspiration & Context

Energy inefficiency disproportionately affects low-income households and small businesses who lack access to sophisticated energy management tools. With rising energy costs and growing environmental concerns, we recognized the urgent need for an accessible, AI-powered solution that could democratize energy optimization.

The expanding sustainability tech market and advances in machine learning inspired us to create a platform that combines predictive analytics with conversational AI, making complex energy data understandable and actionable for everyday users.

## ✨ Features

### 🔮 **Smart Energy Forecasting**

- **LSTM Neural Networks** for accurate energy consumption prediction
- **Pattern Recognition** to identify usage trends and anomalies
- **Multi-horizon Forecasting** from daily to monthly predictions

### 🤖 **Intelligent Document Analysis**

- **RAG-powered Chatbot** that understands your energy bills and reports
- **PDF Processing** with automatic data extraction
- **Contextual Insights** based on your specific energy usage patterns

### 📊 **Interactive Analytics Dashboard**

- **Real-time Visualizations** with Chart.js integration
- **Cost Breakdown Analysis** with actionable recommendations
- **Comparative Analytics** to track improvement over time

### 💰 **Cost Optimization Engine**

- **Personalized Recommendations** based on usage patterns
- **Peak Hour Analysis** to minimize high-cost consumption
- **Savings Calculator** to track financial impact

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern UI framework with latest features
- **TypeScript** - Type-safe development
- **TailwindCSS 4.1** - Utility-first styling framework
- **Vite** - Fast development build tool
- **Chart.js** - Interactive data visualizations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library

### Backend

- **Flask** - Python REST API framework
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.8+** - Core backend language

### AI & Machine Learning

- **TensorFlow/Keras** - LSTM neural networks for time series forecasting
- **Google Gemini API** - Advanced embeddings and natural language processing
- **ChromaDB** - Vector database for document storage and retrieval
- **PyPDF** - PDF document parsing and text extraction
- **Camelot** - Table extraction from PDFs
- **Tiktoken** - Token counting and management

### Data Processing

- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning utilities

### Development & Deployment

- **ESLint** - Code linting and formatting
- **Python dotenv** - Environment variable management

## Setup 🚀

### Prerequisites

Make sure you have **Node.js** and **Python 3.8+** installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/karthikyammanur/arkos.git
cd arkos
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd Model_

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Install Python dependencies
pip install flask flask-cors tensorflow pandas numpy scikit-learn google-generativeai chromadb PyMuPDF python-dotenv

# Create .env file in Model_ directory
echo GEMINI_API_KEY=your_gemini_api_key_here > .env

# Start Flask server
python app.py
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend folder
cd FrontEnd

# Install dependencies
npm install

# Start React development server
npm run dev
```

### 4. Access the Application

Open your browser and go to **http://localhost:5173**

The Flask backend will be running on **http://localhost:5000**

> **Note**: Make sure to get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and replace `your_gemini_api_key_here` in the .env file.

## 🚀 Usage

1. **Launch the Application**: Open your browser to `http://localhost:5173`
2. **Upload Documents**: Upload energy bills, consumption reports, or related documents
3. **Analyze Patterns**: Use the LSTM predictor to forecast future energy consumption
4. **Get Insights**: Chat with the RAG-powered assistant for personalized recommendations
5. **Track Progress**: View interactive charts and monitor your energy optimization journey

## 🏗️ Project Architecture

```
Arkos/
├── FrontEnd/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   └── assets/          # Static assets
│   ├── package.json         # Node.js dependencies
│   └── vite.config.ts       # Vite configuration
├── Model_/                  # Flask backend & AI models
│   ├── app.py              # Main Flask application
│   ├── chatbot.py          # RAG chatbot implementation
│   ├── LSTM_SGO.ipynb      # LSTM model notebook
│   └── sego_data_processor.py # Data processing utilities
└── README.md               # Project documentation
```

## 🎯 Key Algorithms & Models

### LSTM Energy Forecasting

- **Architecture**: Multi-layer LSTM with dropout regularization
- **Input Features**: Historical consumption, time-based features, weather data
- **Output**: Multi-step ahead energy consumption predictions
- **Performance**: Optimized for both accuracy and computational efficiency

### RAG Document Analysis

- **Embedding Model**: Gemini embedding-exp-03-07
- **Vector Store**: ChromaDB for semantic search
- **Chunking Strategy**: 800-token overlapping chunks
- **Retrieval**: Hybrid semantic + keyword search

## 👥 Team & Contributors

- **[Karthik Yammanur](https://github.com/karthikyammanur)** - LSTM Model Development & Implementation
- **Tejas Raman** - Frontend Development & Backend Integration
- **Shaheem Jaleel** - RAG Implementation & Chatbot Development
- **Aaroh Nanoti** - Backend Development & Frontend Integration

---
