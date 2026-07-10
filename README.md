# 🚗 SlotSmart

> A modern Smart Parking Management System built with **React**, **Django REST Framework**, **PostgreSQL**, **Render**, **Vercel**, and **Safaricom Daraja API**.

SlotSmart is a full-stack web application that digitizes parking operations by allowing administrators, gate staff, and drivers to manage parking sessions efficiently. The system integrates M-Pesa STK Push payments, role-based authentication, and real-time parking management.

---

## 📖 Overview

SlotSmart was developed to simplify parking management by replacing manual processes with a centralized digital platform.

The system allows:

- Drivers to view their parking sessions and pay via M-Pesa.
- Gate Staff to check vehicles in and out.
- Administrators to manage users and monitor parking operations.

---

## 🌐 Live Demo

**Frontend:** https://slotsmart-system.vercel.app

**Backend API:** https://slotsmart-backend.onrender.com

---

## 📁 Repository

https://github.com/SeanMugo/SlotSmart-frontend

---

## ✨ Features

### Authentication

- JWT Authentication
- Role-based access control
- Secure login
- Protected API endpoints

### Driver

- View active parking session
- View parking history
- View parking slot availability
- Receive checkout notification
- Pay parking fees using M-Pesa STK Push

### Gate Staff

- Check vehicles into parking
- Check vehicles out
- Assign parking slots
- Monitor active parking sessions

### Administrator

- View system dashboard
- Manage users
- Create Driver, Gate Staff and Admin accounts
- View parking slots
- Monitor overall parking activity

---

## 💳 M-Pesa Integration

SlotSmart integrates with the **Safaricom Daraja API**.

Features include:

- STK Push initiation
- Callback handling
- Automatic payment verification
- Wallet/M-Pesa hybrid payment support
- Automatic parking session completion after successful payment

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide React

### Backend

- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- WhiteNoise

### Database

- PostgreSQL (Render)

### Deployment

Frontend

- Vercel

Backend

- Render

---

## 📂 Project Structure

```
slotsmart/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── hooks/
│
├── slotsmart-backend/
│   ├── accounts/
│   ├── parking/
│   ├── mpesa_integration/
│   └── slotsmart_backend/
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/seanmugo/slotsmart-frontend.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd slotsmart-backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
SECRET_KEY=your_secret_key

DATABASE_URL=your_database_url

MPESA_CONSUMER_KEY=xxxxxxxx

MPESA_CONSUMER_SECRET=xxxxxxxx

MPESA_SHORTCODE=xxxxxxxx

MPESA_PASSKEY=xxxxxxxx
```

### Frontend (.env)

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

---

## 🔄 Parking Workflow

1. Driver arrives.
2. Gate Staff checks the vehicle into an available slot.
3. Parking session becomes active.
4. Gate Staff initiates check-out.
5. Driver receives payment prompt.
6. Driver pays using M-Pesa STK Push.
7. Payment callback confirms transaction.
8. Parking session is completed.
9. Parking slot becomes available again.

---

## 🔒 Security

- JWT Authentication
- Password hashing
- Protected API endpoints
- Role-based authorization
- Secure M-Pesa callback validation

---

## 🚧 Future Improvements

- Wallet Top-Up
- Driver Wallet Transactions
- Reports & Analytics
- Dynamic Pricing
- Password Change on First Login
- Profile Management
- Email Notifications
- Parking Reservations
- Receipt Generation
- QR Code Check-In
- Live Dashboard Updates

---

## 👨‍💻 Author

**Sean Mugo**

GitHub: https://github.com/SeanMugo

---

## 📄 License

his project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.