# 🚗 RentalWheels - Car Rental Platform

A modern, full-stack car rental web application built with React and Firebase, featuring secure authentication, real-time booking management, and an intuitive user experience.

## 🌟 Live Demo

**Client:** [Your Firebase Hosting URL]  
**Server:** [Your Backend URL]

## 📋 Project Overview

RentalWheels is a comprehensive car rental platform that connects car owners with renters. Users can list their vehicles for rent, browse available cars, make bookings, and manage their listings and reservations - all through an elegant and responsive interface.

## ✨ Key Features

### 🔐 Authentication & Security

- **Firebase Authentication** - Secure user registration and login
- **JWT Token Verification** - Protected routes with Firebase Admin SDK
- **Secure Axios Interceptors** - Automatic token injection for authenticated requests
- **Authorization Middleware** - User-specific data access control
- **Protected Routes** - Client-side route protection for authenticated users
- **Session Management** - Auto logout on token expiration (401/403 errors)

### 🚙 Car Management

- **Add New Cars** - List your vehicle with details (name, model, price, location, features)
- **Update Listings** - Edit your car information anytime
- **Delete Listings** - Remove cars from the platform
- **Real-time Availability** - Automatic status updates (Available/Unavailable)
- **Search & Filter** - Find cars by name, location, or price range
- **Car Details Page** - Comprehensive information with image gallery

### 📅 Booking System

- **Date-based Booking** - Select start and end dates with validation
- **Price Calculator** - Real-time total price calculation
- **Booking History** - View all your past and current bookings
- **Cancel Bookings** - Cancel reservations and restore car availability
- **Prevent Self-booking** - Users cannot book their own cars
- **Date Validation** - No past dates, end date must be after start date

### 🎨 User Interface

- **Responsive Design** - Optimized for mobile, tablet, and desktop (with lg breakpoints)
- **Modern UI Components** - Built with DaisyUI and Tailwind CSS
- **Smooth Animations** - Framer Motion for elegant transitions
- **Loading States** - Skeleton loaders and spinners
- **Toast Notifications** - Real-time feedback with React Hot Toast
- **Sweet Alerts** - Confirmation dialogs for critical actions
- **Error Handling** - Custom 404 page and error boundaries

### 🏠 Homepage Sections

- **Hero Banner** - Eye-catching introduction with call-to-action
- **Search & Filter** - Quick car search with multiple filters
- **Featured Cars** - Highlighted premium vehicles
- **Top Rated Cars** - Best-rated rentals
- **Why Rent With Us** - Platform benefits and features
- **Customer Testimonials** - User reviews and ratings
- **Newsletter Signup** - Email subscription for updates

## 🛠️ Technologies & Libraries

### Frontend

- **React 19** - Latest React with modern hooks
- **React Router v7** - Client-side routing with `use()` hook pattern
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Axios** - HTTP client with interceptors
- **Firebase SDK** - Authentication and hosting
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alert modals
- **React Icons** - Icon library
- **React Simple Typewriter** - Typing animation effect
- **React Tooltip** - Enhanced tooltips
- **React DatePicker** - Date selection component

### Backend

- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **Firebase Admin SDK** - JWT token verification
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
rental-car-client/
├── public/
│   └── _redirects          # Netlify routing config
├── src/
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable components
│   │   ├── CarsCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── Error404.jsx
│   ├── contexts/           # React Context
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── useAxios.js
│   │   └── useAxiosSecure.js
│   ├── layouts/            # Layout components
│   │   └── MainLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── Auth/
│   │   ├── BrowseCars/
│   │   ├── CarDetails/
│   │   ├── AddCar/
│   │   ├── MyBookings/
│   │   ├── MyListings/
│   │   └── LearnMore/
│   ├── routes/             # Routing configuration
│   │   ├── routes.jsx
│   │   └── PrivateRoutes.jsx
│   ├── firebase/           # Firebase config
│   │   └── firebase.config.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔒 Security Implementation

### Frontend Security

- **useAxiosSecure Hook**: Custom hook with request/response interceptors
  - Automatically adds `Authorization: Bearer <token>` header
  - Handles 401/403 errors by logging out user
  - Prevents unauthorized access to protected routes

### Backend Security

- **Firebase Token Verification**: Every protected route verifies JWT tokens
- **User Authorization**: Routes check if user owns the resource
- **Input Validation**: Server-side validation for all data
- **Error Handling**: Secure error messages without exposing internals

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Firebase project

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rht789/car-rental-client.git
cd rental-car-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```

4. **Run development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## 🎯 API Endpoints

### Users

- `POST /users` - Create/update user profile (Public)
- `GET /users` - Get all users (Public)

### Cars

- `GET /cars` - Get all cars with optional search/filter (Public)
- `GET /cars/:id` - Get single car details (Public)
- `POST /cars` - Add new car (Protected)
- `PUT /cars/:id` - Update car details (Protected)
- `PATCH /cars/:id` - Update car status (Protected)
- `DELETE /cars/:id` - Delete car (Protected)

### Bookings

- `GET /bookings` - Get user bookings (Protected)
- `POST /bookings` - Create new booking (Protected)
- `DELETE /bookings/:id` - Cancel booking (Protected)

## 🎨 Design Features

- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Custom Fonts**: Integrated Google Fonts for headings and body text
- **Dark/Light Themes**: DaisyUI theme support
- **Smooth Transitions**: Framer Motion animations throughout
- **Optimized Images**: Lazy loading and responsive images

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**  
GitHub: [@rht789](https://github.com/rht789)

## 🙏 Acknowledgments

- Firebase for authentication and hosting
- Tailwind CSS and DaisyUI for the beautiful UI
- MongoDB for reliable data storage
- React community for amazing libraries

---

**Made with ❤️ by RentalWheels Team**
