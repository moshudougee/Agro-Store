# Farmer Ordering System

This project is a simple farmer ordering system designed to help farmers purchase fertilizers and seeds from an agro-input store. The system automatically calculates the required quantities of fertilizers and seeds based on the size of the farmer's land. It also includes features for order management, such as approval or rejection of orders by the agro-input store.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)

---

## Features

- **Farmer Order Placement**:
  - Farmers can place orders for fertilizers and seeds.
  - The system automatically calculates the required quantities based on the size of the land.
  - Fertilizer and seed quantities are constrained by predefined rules:
    - Fertilizer: Maximum of 3kg per 1 acre.
    - Seeds: Maximum of 1kg per 1 acre.

- **Order Management**:
  - Agro-input store can view a list of orders.
  - Orders can be approved or rejected based on payment status.
  - Pagination is implemented with a default limit of 5 records per page.
  - Orders are sorted alphabetically.

- **Backend**:
  - Built with Node.js, Express, and TypeScript.
  - Uses MongoDB for database management.
  - Includes linting, testing, and build scripts.

- **Frontend**:
  - Built with React, Vite, and TailwindCSS.
  - Includes form handling with `react-hook-form` and state management with `zustand`.
  - Testing is done with Vitest.

---

## Technologies Used

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **TypeScript**: Programming language.
- **MongoDB**: Database.
- **Jest**: Testing framework.
- **ESLint**: Linting tool.

### Frontend
- **React**: Frontend library.
- **Vite**: Build tool.
- **TailwindCSS**: CSS framework.
- **Vitest**: Testing framework.
- **Axios**: HTTP client.
- **React Router**: Routing library.

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or cloud instance)

### Steps
Clone the repository:
   ```bash
   git clone https://github.com/your-username/farmer-ordering-system.git
   cd farmer-ordering-system
   cd backend
npm install

cd ../frontend
npm install

Set up the database:
Update the .env file in the backend directory with your MongoDB connection string.

Example .env file:
DATABASE_URL=mongodb://localhost:27017/farmer-ordering-system

Running the Project
Backend

Start the backend server in development mode:
cd backend
npm run dev

Build and start the backend server in production mode:
npm run build
npm start

Frontend
Start the frontend development server:
cd frontend
npm run dev

Build the frontend for production:
npm run build

Project Structure

farmer-ordering-system/
├── backend/
│   ├── src/                # Source code for the backend
│   ├── dist/               # Compiled TypeScript files
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
├── frontend/
│   ├── src/                # Source code for the frontend
│   ├── public/             # Static assets
│   ├── .env                # Environment variables
│   └── package.json        # Frontend dependencies and scripts
└── README.md               # Project documentation

API Endpoints
Farmers
POST /api/farmers/orders: Place a new order.

GET /api/farmers/orders: List all orders (paginated and sorted).

Agro-Input Store
GET /api/store/orders: List all orders.

PUT /api/store/orders/:id/approve: Approve an order.

PUT /api/store/orders/:id/reject: Reject an order.

Testing
Backend
Run unit tests:

cd backend
npm test

Run tests in watch mode:
npm run test:watch

Generate test coverage report:
npm run test:coverage

Frontend
Run unit tests:
cd frontend
npm test

Run tests in UI mode:
npm run test:ui
