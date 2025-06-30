# 🎨 Blog App — Frontend (React)

This is the **frontend** of the Full Stack Blog Application. It provides an interactive, responsive user interface built with **React** and styled using **plain CSS and inline styles**. It consumes the REST APIs from the Spring Boot backend.

---

## 🛠️ Technologies & Libraries

- **React.js**
- **Axios** (for API requests)
- **Formik** (for handling forms)
- **React Router**
- **React Context API** (for global auth state)
- **Custom Toasts** (for notifications)
- **Plain CSS + Inline Styling**

---

## 🗂️ Project Structure
Frontend/
├── public/
├── src/
│ ├── components/ # Reusable UI elements (Header, Sidebar, etc.)
│ ├── pages/ # Page-level components (Home, Login, Blogs, etc.)
│ ├── context/ # React Context (Auth)
│ ├── api/ # Axios API calls
│ ├── App.js # Main App router
│ └── index.js # Entry point
├── package.json
└── .gitignore


---

## ✨ Features

### ✅ Authentication
- Login and Signup forms (Formik)
- Stores JWT in `localStorage`
- Global auth state managed using **React Context**
- Conditional rendering based on auth state

### 📝 Blog Posts
- View all blogs (feed)
- Create blog (with optional image upload)
- Edit/delete own blogs
- Like/unlike blogs
- View blog details with comments

### 💬 Comments
- View all comments on a blog
- Add, edit, delete own comments

### 🔔 Notifications
- Unread notification count in bell icon
- New toast popups for each unread notification (4s interval)
- Mark notifications as read
- Clicking a notification redirects to the related blog

### 🧑 Account
- View own blog posts
- View account stats: total blogs, total interactions, etc.

### 🏘️ Community
- View all communities
- Search communities
- Join/Leave/Create communities
- Create posts within joined communities
- View all posts in a community
- Like and comment on community posts

---

## 📷 Media Support

- Blog posts can include an image.
- Default image shown if none is uploaded.
- User profile supports avatar (default or uploaded).


