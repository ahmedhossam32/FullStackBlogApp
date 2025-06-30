# 📰 Full Stack Blog App

This is a complete full-stack blogging platform built with **Java Spring Boot (Backend)** and **React (Frontend)**. It supports user authentication, blog creation, interaction through likes and comments, community features, and real-time notifications.

---

## 🛠️ Built With

### 🧠 Backend
- Java 17
- Spring Boot
- Spring Security with JWT
- Hibernate (JPA)
- PostgreSQL
- Lombok

### 🎨 Frontend
- React.js
- Axios
- Formik
- Context API
- Plain CSS / Inline styling

### 🔗 Other Tools
- Postman (API Testing)
- GitHub
- IntelliJ & VS Code

---

## ✨ Features

- ✅ User registration with optional profile picture
- ✅ Login with JWT authentication
- ✅ Create, edit, and delete blogs
- ✅ Add images to blog posts
- ✅ Like/unlike posts
- ✅ Comment on blog and community posts
- ✅ Real-time notifications using Observer pattern (like/comment)
- ✅ Create, join, leave communities
- ✅ Write posts in communities
- ✅ View public blogs & search by title/content
- ✅ See account stats and recent activity
- ✅ Admin role for moderation
- ✅ Fully responsive UI

---

## 🖼️ Screenshots (with explanations)

### 1. `HomePage.png`  
The landing page when a user visits the web app for the first time.

### 2. `Signin.png`  
User signs in to access features like writing, liking, and commenting.

### 3. `SignUp.png`  
User registration screen with name, email, DOB, profile picture (optional), username, and password.

### 4. `FYP1.png`  
Feed of all public blogs sorted by newest first. Users can interact by liking or commenting.

### 5–6. `Blogs1.png`, `Blogs2.png`  
Browsing public blog posts, with visible like and comment counts.

### 7. `Blogs3Liked.png`  
User liked several posts, including "How I Stayed Focused" and "Coding Daily".

### 8–9. `Blogs4.png`, `blogs5.png`  
User explored Olivia's blog about solo travel and liked it.

### 10. `Commented.png`  
User commented on Olivia’s post. Another comment from Noah is also visible.

### 11. `EditAndDeleteComment.png`  
User can edit or delete their own comment if needed.

### 12. `PostBlog1.png`  
User starts creating a new blog post.

### 13. `PostBlog2.png`  
User writes the title, content, and adds a blog image.

### 14. `MyPostAdded.png`  
The newly published blog appears in the public feed with others.

### 15. `SearchBlogs.png`  
User searches for "Java" and finds blogs that mention it in the title or content.

### 16–17. `AddednewPost.png`, `MyPostComments.png`  
User added new posts and explored comments on their own blog.

### 18. `MyBlogs.png`  
User opens "My Blogs" from the sidebar and sees all their written blogs.

### 19. `myblogsEditorDelete.png`  
User has the ability to edit or delete their own blog posts directly.

### 20. `EditMyBlog.png`  
Edit blog post screen — user can change title, content, and image.

### 21. `DeleteMyblog.png`  
Confirmation that a user can easily delete their own blog.

### 22–23. `NotificationLiked.png`, `NotificationCommented.png`  
Notifications appear when someone likes or comments on a user’s blog.

### 24. `NotificationDetails.png`  
User can mark notification as read or dismiss the popup toast.

### 25–26. `MyPostComments2.png`, `MyPostComments.png`  
Different blogs by the user now contain many comments.

### 27. `MyAccountDetails.png`  
Shows account info: username, email, total blogs, likes, comments, recent activity.

### 28. `LogoutSignout.png`  
User can log out via the red "Logout" button or from the sidebar below the profile picture.

---

## 📂 Project Structure

FullStackBlogApp/
├── Backend/
│ └── BlogApp/ # Spring Boot project
├── Frontend/ # React application
├── Screenshots/ # App UI screenshots
└── README.md # This file



---

## 🔙 Backend (Spring Boot)

The backend handles all business logic, database interaction, security, and API endpoints for authentication, blogs, likes, comments, communities, and notifications.

> 📌 Full documentation available at:  
> [`Backend/BlogApp/README.md`](./Backend/BlogApp/README.md)

---

## 🔜 Frontend (React)

The frontend is a fully responsive SPA built using React with inline styling. It connects to the backend using Axios and manages auth state via Context API.

> 📌 See: [`Frontend/README.md`](./Frontend/README.md)

---

## 🙌 Author

**Ahmed Hossam**

---


