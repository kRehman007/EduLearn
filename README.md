<div align="center">

# 🎓 EduLearn — Online Learning Platform

**Learn Anytime, Anywhere.**

A full-stack MERN (MongoDB · Express · React · Node.js) online course marketplace — a complete Udemy-style learning platform with student enrollment, ratings & reviews, and a full admin panel.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

</div>

---

## 📖 Description

**EduLearn** is a production-style online learning platform where users discover expert-led courses, enroll in them, and share their experience through ratings and reviews — while admins curate and manage the course catalog.

The application is built as two decoupled applications:

- **Backend** — a REST API written in Node.js + Express, using MongoDB/Mongoose for persistence, JWT cookies for authentication, and Nodemailer for automated enrollment confirmation emails.
- **Frontend** — a responsive single-page application built with React (Vite), Redux Toolkit + RTK Query for state/data fetching, Material UI + Tailwind CSS for a clean, modern light theme, and `react-hook-form` + `zod` for bulletproof form validation.

From signup to first course enrollment, the entire learner journey is covered, and a dedicated admin dashboard makes the platform fully self-manageable.

---

## ⭐ Key Highlights

- 🔐 **Secure JWT authentication** — passwords hashed with HMAC-SHA256 + per-user salt, session persisted in an httpOnly cookie.
- 👑 **Role-based access control** — `/admin` and `/dashboard` are restricted to the **admin email only**; every other user is redirected automatically.
- 🚀 **Frictionless enrollment** — name & email are auto-filled from the logged-in user; the modal only asks for phone, city and country.
- ⛔ **Duplicate-enrollment protection** — already enrolled? The button switches to a disabled **"Enrolled"** state and the API rejects re-enrollment.
- ⭐ **Mandatory post-enrollment review** — a rating & review modal that **cannot be dismissed** until submitted, keeping the review quality high.
- ✉️ **Automated branded confirmation emails** — a styled HTML enrollment email is sent instantly via Gmail SMTP (Nodemailer).
- 🗂️ **Full admin panel** — add courses with image upload + dynamic highlights & FAQs, and **view or delete** any course (with a confirmation modal).
- 🧩 **Consistent data model** — shared category definitions across the admin form and the course filter, eliminating mismatched options.
- 🎨 **Modern light UI** — Material UI v6 + Tailwind, custom fonts (Montserrat / Poppins / Roboto), and a violet → pink brand palette.

---

## ✨ Features

### 👤 For Learners
- Sign up / log in / log out
- Browse and search courses by title, filter by category
- View rich course details (description, highlights, instructor, FAQs, ratings)
- Enroll in a course with one click
- Leave a rating and a written review after enrolling

### 🛠️ For Admins
- Add new courses (title, subtitle, price, category, instructor info, image, highlights, FAQs)
- View detailed information about every course
- Delete any course (cleans up enrollments & ratings too)
- Dedicated dashboard with stats (total courses, total students, recent activity)

### 🔧 Platform-wide
- Email enrollment confirmations (Gmail SMTP)
- Admin-only route protection on the client
- Fully responsive layout (mobile → desktop)
- Toast notifications & loading states throughout

---

## 🧰 Tech Stack

### Backend (`backend/`)
| Technology | Purpose |
|---|---|
| **Express** ^4.21 | Web framework / REST API |
| **Mongoose** ^8.8 | MongoDB ODM |
| **jsonwebtoken** ^9.0 | JWT sign/verify |
| **cookie-parser** + **express-session** + **connect-flash** | Session & flash messages |
| **multer** | In-memory image upload (stored as Buffers) |
| **nodemailer** ^6.9 | Enrollment confirmation emails |
| **cors**, **dotenv** | Cross-origin & environment config |

### Frontend (`frontend/`)
| Technology | Purpose |
|---|---|
| **React** ^18.3 + **Vite** ^5 | UI library & build tool |
| **React Router** ^6.28 | Client-side routing |
| **Redux Toolkit + RTK Query** ^2.3 | State management & API data fetching |
| **Material UI** ^6.1 + Emotion | Component library & theming |
| **Tailwind CSS** ^3.4 | Utility-first styling |
| **react-hook-form** + **zod** | Forms & validation |
| **react-icons** | Icon set |

---

## 🗂️ Project Structure

```
EduLearn_MERN/
├── backend/                  # Express + Mongoose REST API (CommonJS)
│   ├── index.js              # Server entry point
│   ├── config/               # Mongoose connection, multer config
│   ├── controllers/          # user, course, admin controllers
│   ├── middlewares/          # JWT cookie auth middleware
│   ├── models/               # user, course, student, rating models
│   ├── routes/               # admin, user, course, student (enrollment), rating routers
│   └── utils/                # JWT create/validate
└── frontend/                 # React 18 + Vite SPA
    ├── index.html
    ├── src/
    │   ├── main.jsx          # Entry (MUI ThemeProvider, Router, Auth, Redux)
    │   ├── App.jsx           # Route table
    │   ├── theme.js          # MUI light theme
    │   ├── index.css         # Tailwind + global styles/tokens
    │   ├── constants/        # Shared course categories
    │   ├── Redux/            # RTK Query API slices + store
    │   └── Components/       # All UI (Home, Courses, CourseDetail, Auth, Admin, Dashboard, Hooks, shared)
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local instance or an Atlas connection string)

### 1. Clone the repository

```bash
git clone https://github.com/kRehman007/EduLearn_MERN.git
cd EduLearn_MERN
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)), then start the server:

```bash
npm start
```

> The API runs on **http://localhost:5001**.

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

> Open **http://localhost:5173** in your browser.

> ⚠️ **Note:** The frontend API base URL (`http://localhost:5001`) is hardcoded in
> `src/Redux/API/userAPI.js`, `src/Redux/API/courseAPI.js`, and
> `src/Components/Hooks/useUserAuth.jsx`.

---

## 🔐 Environment Variables

Create `backend/.env` with the following:

```env
MONGODB_URI="mongodb://127.0.0.1:27017/learningplatform"
JWT_SECRET=your_secret_key_here
FLASH_SESSION_SECRET=your_flash_secret_here
MY_EMAIL=your_email@gmail.com
MY_PASS=your_gmail_app_password
ADMIN_EMAIL=admin_email@gmail.com
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign/verify JWT tokens |
| `FLASH_SESSION_SECRET` | Secret for express-session / flash messages |
| `MY_EMAIL` | Sender Gmail address for nodemailer |
| `MY_PASS` | **Gmail App Password** (16 chars, no spaces) for SMTP |
| `ADMIN_EMAIL` | Email that gets the `admin` role on signup |

### 📧 Enabling enrollment emails

Enrollment confirmation emails are sent via Gmail SMTP. You must use a
**Gmail App Password**, not your normal account password:

1. Enable **2-Step Verification** on your Google account.
2. Go to **Google Account → Security → App passwords**.
3. Generate a 16-character app password and set it as `MY_PASS`.

On startup the server verifies the SMTP credentials and logs whether emails
are enabled. If sending fails, enrollment still succeeds and the response
includes `emailSent: false`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/check` | Get the authenticated user from the token cookie |
| POST | `/user/signup` | Register a new user (admin if email === `ADMIN_EMAIL`) |
| POST | `/user/login` | Log in, sets `token` cookie |
| POST | `/user/logout` | Clear the `token` cookie |
| POST | `/admin/courses` | Add a course (multipart form with image) — admin |
| DELETE | `/admin/courses/:id` | Delete a course (also removes enrollments & ratings) — admin |
| GET | `/courses` | List all courses (images as base64) |
| POST | `/enrollment` | Enroll a user in a course + send confirmation email |
| GET | `/enrollment/total-students` | List all students |
| GET | `/enrollment/status/:id` | Check if the logged-in user is enrolled (auth required) |
| GET | `/enrollment/total/:id` | Count students enrolled in a course |
| POST | `/rating` | Add a rating/review |
| GET | `/rating/:courseID` | Get average rating + comments for a course |

---

## 🧩 How It Works

1. **Register** — create an account; if your email matches `ADMIN_EMAIL` you become an admin.
2. **Browse** — explore the course catalog, search by title, or filter by category.
3. **View** — open a course to see its description, highlights, instructor, FAQs, and community ratings.
4. **Enroll** — confirm enrollment (name & email are already filled in) and a confirmation email is dispatched.
5. **Review** — a required rating & review modal appears so the course keeps gaining social proof.
6. **Manage (admin)** — add courses from the panel or manage/delete them from the dashboard.

---

## 📜 Key Scripts

**Backend:**

```bash
npm start      # start server with nodemon
```

**Frontend:**

```bash
npm run dev    # start Vite dev server
npm run build  # production build
npm run lint   # eslint
```

---

## 🗺️ Roadmap

- [ ] Stripe / payment gateway integration for paid enrollments
- [ ] Course video hosting & progress tracking
- [ ] Pagination & lazy loading for the course catalog
- [ ] Centralized backend error handling
- [ ] Unit & integration tests (Jest / React Testing Library)

---

## 📝 Notes / Known Caveats

- Course images are stored as **Buffers in MongoDB** and served as base64 data-URIs — fine for small datasets, not recommended for scale.
- The JWT cookie is set with `secure: true` / `sameSite: "none"`, so it **requires HTTPS in production** (works locally with dev tools / the deployed HTTPS frontend).
- There is no centralized error-handling middleware; each route handles errors individually.
- Some dependencies in `package.json` (Stripe, Redis, SendGrid, Swiper, `config`) are installed but not yet used — reserved for future features.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📬 Contact

- **Developer:** Kashif ur Rehman
- **GitHub:** [kRehman007](https://github.com/kRehman007)
- **LinkedIn:** [kashifdev](https://www.linkedin.com/in/kashifdev/)

---

<div align="center">

**Made with ❤️ using the MERN stack** — © 2024 EduLearn. All rights reserved.

</div>
