# Service Providers API

A robust RESTful API built with JavaScript, Node.js, Express, and MongoDB for managing service provider bookings and appointment scheduling.

This system connects **Service Providers** with **Clients** through a secure and automated scheduling workflow.

---

# Features

## Authentication & Security
- JWT-based authentication
- Password hashing using Bcrypt
- Protected routes with middleware authorization
- Role-Based Access Control (RBAC)

## Provider Features
Providers can:

- Create available time slots
- View their slots
- Update slot details
- Delete slots
- Manage booking availability

## User Features
Users can:

- View available slots
- Filter slots by provider
- Book appointments
- Cancel their own bookings

## System Features
- Automatic slot status updates (`isBooked`)
- Data validation and error handling
- RESTful API design
- Interactive API documentation using Swagger

---
# Project Structure

```bash
Service-Providers_Project/
│
├── src/
│   ├── config/       
│   ├── controllers/    
│   ├── jobs/         
│   ├── middleware/     
│   ├── models/         
│   ├── routes/        
│   ├── services/      
│   ├── utils/
│   ├── validations/  
│   └── app.js       
│               
├── package.json
├── package-lock.json
└── server.js
```
---
Create environment variables file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

# API Endpoints

---

# Authentication

## Register User

```http
POST /api/auth/signup
```

Request:

```json
{
  "name": "ali",
  "email": "ali@example.com",
  "password": "securepassword123",
  "role": "provider"
}
```

Response:

```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "ali",
    "role": "provider"
  }
}
```

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "ali@example.com",
  "password": "securepassword123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---

# Slot Management (Provider Only)

Authorization required:

```bash
Bearer <TOKEN>
```

---

## Create Slot

```http
POST /api/slots
```

Request:

```json
{
  "date": "2026-12-01",
  "startTime": "09:00",
  "endTime": "10:00",
  "duration": 60
}
```

Response:

```json
{
  "message": "Slot created successfully"
}
```

---

## Update Slot

```http
PUT /api/slots/:id
```

Request:

```json
{
  "startTime": "11:00",
  "endTime": "12:00"
}
```

Response:

```json
{
  "message": "Slot updated successfully"
}
```

---

## Delete Slot

```http
DELETE /api/slots/:id
```

Response:

```json
{
  "message": "Slot deleted successfully"
}
```

---

## Get My Slots

```http
GET /api/slots/my
```

Response:

```json
{
  "success": true,
  "data": [...]
}
```

---

# Available Slots

## Get Available Slots

```http
GET /api/slots/available
```

Optional Query:

```http
GET /api/slots/available?provider={providerId}
```

Response:

```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

---

# Appointment Management (User Only)

Authorization required:

```bash
Bearer <TOKEN>
```

---

## View Available Slots For Booking

```http
GET /api/appointments/slots
```

Response:

```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

---

## Book Appointment

```http
POST /api/appointments/:slotId
```

Response:

```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "_id": "appointment_id",
    "status": "booked"
  }
}
```

---

## Cancel Appointment

```http
DELETE /api/appointments/:appointmentId
```

Response:

```json
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```
# API Documentation

After running the project, Swagger documentation will be available at:

```bash
http://localhost:3000/api-docs
