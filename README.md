# 🎓 School Payments System

A full-stack payment management system for schools, built with **Node.js**, **MongoDB**, and **React.js + Vite**.  
This project integrates with the **Edviron Payment Gateway** to allow students/parents to pay securely, and provides an **Admin Dashboard** for schools to track all transactions.

## 🚀 Features
- ✅ Student/Parent enters details (Name, Email, Phone, etc.) and is redirected to **Edviron Payment Gateway**.
- ✅ Payment status is tracked via **callback URL** and **Check Payment API**.
- ✅ All transactions and statuses are stored in MongoDB (`Orders` and `OrdersStatus` collections).
- ✅ Admin login (with email/password) for accessing **Dashboard**.
- ✅ Dashboard shows:
  - All transactions overview
  - Transactions by school
  - Payment status (SUCCESS / FAILED / PENDING)
- ✅ Light/Dark mode support.

## 📦 Tech Stack
- **Frontend**: React.js, React Router, TailwindCSS  
- **Backend**: Node.js, Express.js, JWT, MongoDB  
- **Database**: MongoDB (Mongoose models)  
- **Payment Gateway**: Edviron APIs (Collect Request + Check Payment Status)

## 🧑‍🎓 User Payment Flow
1. **User opens** the payment page → `/`.
2. **Enters details**:
   - Name  
   - Email  
   - Phone  
3. **System generates** a `collect_request` via Edviron API.
4. **User is redirected** to the Edviron **Payment URL**.
5. After payment:
   - Edviron redirects to the **callback URL** → `/payment-success`.
   - Our system verifies the transaction using **Check Payment Status API**.
6. **Payment result** is displayed:
   - ✅ Success → "Payment Successful"
   - ⚠️ Pending → "Payment Pending"
   - ❌ Failed → "Payment Failed"
7. Transaction details are stored in:
   - `Orders` (original request)
   - `OrdersStatus` (payment result/status)

## 👨‍💻 Admin Dashboard Flow
1. Admin navigates to `/admin-dashboard/login`.
2. Enters **email & password** (configured in `.env`):
   - `VITE_ADMIN_EMAIL_ID=admin.access@schoolpayments.online`
   - `VITE_ADMIN_PASSWORD=adminAccess@999`
3. If credentials match → **SessionStorage saves access flag**.
4. Admin gains access to routes:
   - `/admin-dashboard` → Transactions Overview
   - `/admin-dashboard/check-status` → Check specific order status
   - `/admin-dashboard/transactions-by-school` → Filter transactions by school
5. If not logged in → Admin is redirected to login page.

## ⚡ API Endpoints
### 1. Create Payment Request
`POST /`
Creates a collect request on Edviron and stores initial order.
### 2. Check Payment Status
`GET /api/check-payment/:collect_request_id?school_id=<school_id>`
Verifies payment status with Edviron and updates DB.

### 3. Webhook (optional)
`POST /webhook`
Receives real-time payment updates from Edviron and updates DB.

## 🛠️ Setup Instructions

### Backend
cd backend
npm install
npm start
