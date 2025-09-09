💰 Payment-App (User Auth & Money Transfer)

A simple Node.js + Express + MongoDB application where users can:

Sign up for a new account

Sign in with their credentials

Check their account balance

Transfer money to other users

🚀 Features

🔑 User authentication (signup & signin with password hashing)

👤 JWT-based authorization for secure access

💵 Account system with balance check

🔄 Transfer money between accounts

🛡️ input validation & error handling by zod 

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT), bcrypt for password hashing

Environment Management: dotenv

📂 Project Structure

backend/
│-- index.js           # Entry point

│-- routes/            # Route handlers (auth, account, transactions)

│-- models/            # Mongoose models (User, Account)

│-- middleware/        # Auth middlewares (JWT verify, etc.)

│-- package.json


⚙️ Setup Instructions
Clone the Repository
git clone https://github.com/harsharora-code/payment-application.git

📌 API Endpoints
🔑 Auth

POST /signup → Create a new user

POST /signin → Login user and return JWT

👤 Account

GET /account/balance → Get current balance (JWT required)

POST /account/transfer → Transfer money to another user
