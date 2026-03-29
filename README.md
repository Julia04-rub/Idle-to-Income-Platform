# Idle-to-Income-Platform 

## Project Description

The Idle to Income Platform is a web-based application that aims to assist unemployed and underutilized youth across the globe, particularly in Africa, to turn their idle time into income-generating opportunities.

### The features of the application include:
- User registration
- User login authentication
- Viewing of tasks
- Acceptance of tasks
- Submission of tasks
- Tracking of earnings
- Dashboard interface

## Problem Statement

Youth unemployment is a challenge in Africa. The youth have the required skills but lack opportunities for income generation. 

## Why is it a Problem?

- Unemployment rates are high.
- Lack of access to income-generating opportunities.
- Underutilization of youth skills.
- Financial insecurity among the youth.

## Proposed Solution

The I² platform provides users with access to simple tasks that can be completed online. The tasks require minimal resources and can be completed remotely. The tasks will give users a chance to earn income from the opportunities provided. 

## System Features (Based on SRS)

- User Registration  
- User Login Authentication  
- Viewing of tasks  
- Acceptance of tasks  
- Submission of tasks  
- Earnings tracking  
- Dashboard interface  

## System Actors

- User (Primary Actor)
  - Registers and logs in  
  - Accepts and completes tasks  
  - Tracks earnings  



## System Processes

1. User registers  
2. User logs in  
3. User views tasks  
4. User accepts a task  
5. User submits task work  
6. System updates earnings  



##  Demo

Video Demo Link:  


##  Live Deployment

Live App URL: 

##  GitHub Repository

GitHub Link: https://github.com/Julia04-rub/Idle-to-Income-Platform

##  SRS Document

SRS Link: https://docs.google.com/document/d/1ioI5Y27EMfiSqz3P-VmzRlr2zZNbG-4kU4xUDcdLAKM/edit?tab=t.0#heading=h.gjdgxs

##  How to Run the Project Locally

Follow these steps carefully:

### 1. Clone the repository

- git clone https://github.com/your-username/Idle-to-Income-Platform.git
- cd Idle-to-Income-Platform

### 2. Install dependencies

pip install -r requirements.txt

### 3. Run the application

python app.py

### 4. Open in browser

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

- Pushed code to GitHub
- Connected repository to Render
- Set build command:
pip install -r requirements.txt
- set start command:
gunicorn app: app


### Challenges
- static file error structure
- deployment configuration on render

### Improvements
- Add task verification system
- Add admin dashboard
- Improve UI/UX design
- Add database security

### Conclusion

The I² platform demonstrates how simple digital systems can help reduce unemployment by connecting users to income-generating opportunities. It provides a foundation for scalable solutions targeting youth empowerment.


