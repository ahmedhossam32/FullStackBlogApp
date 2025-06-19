# 📝 Spring Blog App

**Spring Blog App** is a full-featured blogging platform where users can write blogs, join communities, comment, like, and receive notifications. The backend is fully implemented using Java Spring Boot, and the frontend (React) will be added later as a team collaboration.

---

## 👤 User Features (ROLE_USER)

- ✅ Sign up & login (JWT secured)
- ✅ Create, update, delete personal blogs
- ✅ Create, join, leave public communities
- ✅ Post in communities
- ✅ Like and unlike posts (blog or community)
- ✅ Comment on any post
- ✅ Receive notifications when someone:
  - Likes your post
  - Comments on your post
- ✅ View joined communities and members
- ✅ Search blogs and communities

---

## 👑 Admin Features (ROLE_ADMIN)

- 🔍 View all users
- 🗑 Delete any blog, comment, or community post
- 🧵 View and moderate all community content

---

## 🛠 Tech Stack

- Java 17
- Spring Boot 3
- Spring Security + JWT
- Hibernate (JPA)
- MySQL
- Lombok


## 📘 Backend API Reference

> Full details and implementation explained in [`Backend/BlogApp/README.md`](https://github.com/ahmedhossam32/spring-blog-app/blob/main/Backend/BlogApp/README.md)




Frontend (coming soon):
- React.js
- Axios

---

## 🧠 Design Patterns Used

The backend uses multiple object-oriented design principles:

- **Strategy Pattern** – for handling notifications via `Interaction` interface (`LikeInteraction`, `CommentInteraction`)
- **Builder Pattern** – for building model objects like `Notification`, `Like`, `Comment` using Lombok’s `@Builder`
- **Template-like Pattern** – for a consistent structure in sending notifications
- **Clean Layered Architecture** – clear separation of controller, service, and repository layers

---

## 📂 Project Structure
spring-blog-app/
├── Backend/ ← Spring Boot backend code
└── Frontend/ ← To be added 


---

## 🔒 Authentication

- `POST /auth/signup` → Register
- `POST /auth/login` → Receive JWT token
- Use `Authorization: Bearer <token>` in all secured requests

---

## ⚙️ Status

- ✅ Backend completed and tested
- 🚧 Frontend under development

