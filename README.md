# Idle-to-Income-Platform 

## Project Description

The Idle to Income Platform is a web-based system designed to help unemployed or underutilized youth transform their idle time into income-generating opportunities.

The system allows users to:
- Register and log in
- View available tasks
- Accept and complete tasks
- Track their earnings

---

##  Problem Statement

Youth unemployment is a major challenge, especially in Africa. Many young people have skills but lack access to opportunities to earn income.

---

## Why is it a Problem?

- High unemployment rates
- Lack of access to job opportunities
- Underutilized skills
- Financial instability among youth

---

## Proposed Solution

The I² platform connects users to simple digital tasks that:
- Require minimal resources
- Can be done remotely
- Provide small but consistent income

This helps users:
- Gain experience
- Build discipline
- Earn money from available opportunities

---

## System Features (Based on SRS)

✔ User Registration  
✔ User Login Authentication  
✔ Task Viewing  
✔ Task Acceptance  
✔ Task Submission  
✔ Earnings Tracking  
✔ Dashboard Interface  

---

## System Actors

- User (Primary Actor)
  - Registers and logs in  
  - Accepts and completes tasks  
  - Tracks earnings  

---

## System Processes

1. User registers  
2. User logs in  
3. User views tasks  
4. User accepts a task  
5. User submits task work  
6. System updates earnings  

---

##  Demo

Video Demo Link:  

---

##  Live Deployment

Live App URL:  

---

##  GitHub Repository

GitHub Link:  

---

##  SRS Document

SRS Link:  

---

##  How to Run the Project Locally

Follow these steps carefully:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Idle-to-Income-Platform.git
cd Idle-to-Income-Platform

### 2.Install dependencies

pip install -r requirements.txt

### 3.Run the application

python app.py

### 4.Open in browser

http://127.0.0.1:5000

### project structure

Idle-to-Income-Platform/
│
├── app.py
├── database.db
├── requirements.txt
│
└── static/
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── script.js
    └── style.css

    ### Deployment

    The project is deployed using Render.

Steps used:

Pushed code to GitHub
Connected repository to Render
Set build command:
pip install -r requirements.txt
set start command:
gunicorn app:app

### Conclusion

The I² platform demonstrates how simple digital systems can help reduce unemployment by connecting users to income-generating opportunities. It provides a foundation for scalable solutions targeting youth empowerment.