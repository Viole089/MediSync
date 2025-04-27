<div align="center">

<h1 align="center"><strong>⚕ MediSync Clinical Assistant Platform : <h6 align="center">AI-platform equipped by agent systems for medical diagnosis and assistance </h6></strong></h1>

![Requests - Version](https://img.shields.io/badge/Requests-2.32.3-blue?style=for-the-badge&logo=requests)
![LangChain-Community - Version](https://img.shields.io/badge/LangChain_Community-0.3.22-teal?style=for-the-badge&logo=langchain)
![OpenAI - Version](https://img.shields.io/badge/OpenAI-1.76.0-blue?style=for-the-badge&logo=openai)
![PyMongo - Version](https://img.shields.io/badge/PyMongo-4.12.0-green?style=for-the-badge&logo=mongodb)
![FastAPI - Version](https://img.shields.io/badge/FastAPI-0.115.12-teal?style=for-the-badge&logo=fastapi)
![python-dotenv - Version](https://img.shields.io/badge/Python_Dotenv-1.1.0-yellow?style=for-the-badge&logo=python)
![Passlib - Version](https://img.shields.io/badge/Passlib-1.7.4-lightgrey?style=for-the-badge&logo=passbolt)
![python-multipart - Version](https://img.shields.io/badge/Python_Multipart-0.0.20-orange?style=for-the-badge&logo=python)
![PyTorch - Version](https://img.shields.io/badge/PyTorch-2.7.0-red?style=for-the-badge&logo=pytorch)
![Torchvision - Version](https://img.shields.io/badge/Torchvision-0.22.0-red?style=for-the-badge&logo=pytorch)
![Matplotlib - Version](https://img.shields.io/badge/Matplotlib-3.10.1-blue?style=for-the-badge&logo=matplotlib)


</div>

----
 
## 📚 Table of Contents
- [Overview](#overview)
- [Technical Flow Chart](#technical-flowchart)
- [Key Features](#key-features)
- [Tech Stack](#technology-stack)
- [Installation and Setup](#installation-setup)
 

----

## 📌 Overview  <a name="#overview"></a>

*MediSync* is an *Clinical Assistant Platform* designed to assist with *medical diagnosis, research, and patient interactions*.  

🚀 *Powered by Dual-Agent Intelligence*, this system integrates:  
- *Access to patient diagnostic summaries via secure CIN-based retrieval.*
- *Manage patient records and showcase them to the doctors*
- *Enhancing personal healthcare awareness with retrieved medical history*

---- 

## Technical Flow Chart <a name="#technical-flowchart"></a>

The MediSync system is built with a *modular microservices architecture* 🧩, featuring two specialized intelligent agents:

- *👨‍⚕ DoctorAgentService*  
  - 🧠 Full LLM support (emotional + clinical decision assistance)
  - 🔒 Secure patient data access
  - 📝 Add and manage patient records

- *🧑‍🦰 PatientAgentService*  
  - 📖 Lightweight access to personal medical summaries
  - 🔐 End-to-end encrypted data for full privacy control

Both services prioritize *security, **speed, and **compliance* with Moroccan data protection laws 📜.
<div align="center">
 
<img src = "https://github.com/Viole089/MediSync/blob/main/Assets/theest%20of%20the%20best%20.png" alt="logo" width="400"/>
</div>
<br><br>
The tech flow for adding new data is so different :

<div align="center">

<br>
 
<img src="https://github.com/Viole089/MediSync/blob/main/Assets/addingnewdata.png" alt="logo" width="400"/>
</div>
<br>
But when we switch to the patient, it's a different Track:
<br>
<div align="center">
<br>
<img src="https://github.com/Viole089/MediSync/blob/main/Assets/Sans-titre-).png" alt="logo" width="500"/>
</div>
---

## Key Features  <a name="#key-features"></a>

- 🧠 *Dual-Agent System*: Separate, optimized services for doctors and patients.
- ❤ *Emotionally Intelligent AI*: Support doctors emotionally and clinically.
- 🛡 *CIN-based Encryption*: Secure and private data handling with national ID keys.
- 📱 *High Accessibility*: French-first 🇫🇷 UI, optional Arabic 🇲🇦 support, mobile-ready design.
- ⚡ *Low Latency*: Rapid data retrieval for seamless experiences.
- 🌍 *Data Sovereignty*: Users stay in full control of their sensitive information.
- ✅ *Regulatory Compliance*: Full CNDP (Law 09-08) data protection.

---

## Technology Stack  <a name="#technology-stack"></a>

### Frontend 🌐
- ⚛ *React.js* — Dynamic, interactive user interfaces
- 🚀 *Next.js* — Server-side rendering and routing
- 🎨 *Tailwind CSS* — Rapid styling and mobile responsiveness

### Backend 🔙
- ⚡ *FastAPI* — High-performance API backend in Python
- 🔗 *LangChain* — Routing between language models and tools

### AI Models 🤖
- 🧹 *Phi-2 SLM* — Cleans and filters text
- 🗣 *LLaMA 3.1 8B Instant (Groq API)* — Emotional support for doctors
- 🏥 *LLaMA 3.3 70B Versatile (Groq API)* — Clinical decision support and patient history summarization

### Authentication 🔐
- 🛡 *OAuth2 + JWT* — Secure login and session management

### Database & Caching 🗃
- 🌎 *MongoDB Atlas* — Secure storage for encrypted medical records
- ⚡ *Redis* — Session management and caching

### Encryption & Security 🔒
- 🛠 *Python Cryptography Library* — AES-256-GCM encryption & PBKDF2 key derivation based on CIN

---

## ⚙ Installation and Setup<a name="#installation-setup">

Follow these steps to set up and run MediSync locally!

---

### 1. Clone the Repository 
bash
git clone https://github.com/your-username/medisync.git
cd medisync

### 2. Create and Activate a Virtual Environment
bash
python3 -m venv venv
cd venv\Scripts\activate


### 3. Install Backend Dependencies
bash
pip install -r requirements.txt

### 4. Environment Variables Setup
Create a .env file in both backend and frontend directories
bash
MONGODB_URI=your_mongodb_atlas_connection_string
REDIS_URL=your_redis_connection_url
JWT_SECRET_KEY=your_super_secret_key
GROQ_API_KEY=your_groq_api_key

### 5. Run the Backend Server 
bash
uvicorn app.main:app --reload

### 6. Run the Frontend Development Server
bash
cd frontend
npm run dev
