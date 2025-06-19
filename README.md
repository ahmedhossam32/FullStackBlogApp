# 📝 Spring Blog App

**Spring Blog App** is a full-featured blogging platform built with Java Spring Boot. It allows users to create and manage blogs, interact within communities, comment, like posts, and receive notifications. The backend is fully developed and tested. The frontend (React) will be integrated soon in collaboration with a teammate.

---

## 👤 User Features (ROLE_USER)

- ✅ Sign up and login securely (JWT)
- ✅ Create, edit, and delete personal blog posts
- ✅ Create, join, and leave communities
- ✅ Post in joined communities
- ✅ Like/unlike blog or community posts
- ✅ Comment on blog or community posts
- ✅ Receive notifications when someone:
  - Likes your post
  - Comments on your post
- ✅ View joined communities and their members
- ✅ Search blogs and communities by title or name

---

## 👑 Admin Features (ROLE_ADMIN)

- 🔍 View all users
- 🗑 Delete any blog, comment, or community
- 🧵 View and moderate all community posts

---

## 🛠 Tech Stack

- Java 17
- Spring Boot 3
- Spring Security + JWT
- Hibernate (JPA)
- MySQL
- Lombok
- Postman (for API testing)

Frontend (coming soon):
- React.js
- Axios

---

## 🧠 Design Patterns Used

- **Strategy Pattern** – Used for dynamic notification logic via the `Interaction` interface
- **Builder Pattern** – Used in model construction with Lombok’s `@Builder`
- **Template-like Pattern** – Ensures reusable structure for notifications
- **Clean Architecture** – Follows Controller → Service → Repository layering

---

## 📁 Project Structure

 Project Structure

---
## 🗂 Project Structure

```
Backend/
└── BlogApp/
├── src/
│ └── main/
│ ├── java/
│ │ └── com/blog/
│ │ ├── Config/ → JWT & Security setup
│ │ ├── Controller/ → All REST endpoints
│ │ ├── Service/ → Business logic layer
│ │ ├── Model/ → Entity classes
│ │ ├── Repository/ → Spring Data JPA Repos
│ │ ├── Interaction/ → Strategy for notifications
│ │ └── BlogAppApplication.java
│ └── resources/
│ └── application.properties
```

---

---

## 📘 Backend API Reference

> Full details and implementation explained in [`Backend/BlogApp/README.md`](https://github.com/ahmedhossam32/spring-blog-app/blob/main/Backend/BlogApp/README.md)

---

## ⚙️ Project Status

- ✅ Backend implementation complete
- ✅ All core features tested with Postman
- 🚧 Frontend integration under development
