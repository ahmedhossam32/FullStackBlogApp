# 📝 Spring Blog App (Backend)

A secure, feature-rich blog platform built with Java Spring Boot. Users can create blog posts, join communities, interact via likes and comments, and receive real-time notifications. This repository contains the **backend**. The **frontend** (React) will be integrated soon in collaboration with a teammate.

---

## 🚀 Tech Stack

- Java 17
- Spring Boot 3
- Spring Security with JWT
- Hibernate (JPA)
- MySQL
- Lombok
- Postman (for testing)

---

## 👥 User Roles

### 🧑 Regular User (`ROLE_USER`)
- ✅ Sign up and login (JWT-based)
- ✅ Create, edit, delete **own blog posts**
- ✅ Like/unlike any post (blog or community)
- ✅ Comment on any post
- ✅ Create, join, leave **communities**
- ✅ Post within joined communities
- ✅ Receive notifications for likes/comments
- ✅ Search blogs and communities
- ✅ View members of owned communities

### 👑 Admin (`ROLE_ADMIN`)
- 🔍 View all users
- 🗑 Delete any blog post, comment, or community
- 📥 View all community posts and moderate them

---

## 📌 Core Features

### 🔐 Authentication
- `POST /auth/signup` → Register new users
- `POST /auth/login` → Authenticate and get JWT token

### 📝 Blog Management
- `POST /blogs` → Create blog
- `GET /blogs` → View all blogs
- `GET /blogs/user` → View own blogs
- `PUT /blogs/{id}` → Edit own blog
- `DELETE /blogs/{id}` → Delete own blog
- `GET /blogs/search?title=` → Search blogs by title

### 🏘 Community Management
- `POST /communities` → Create a community (auto-join as owner)
- `DELETE /communities/{id}` → Delete community (only owner)
- `POST /communities/{id}/join` → Join a community
- `POST /communities/{id}/leave` → Leave a community
- `GET /communities` → Browse all communities
- `GET /communities/joined` → View joined communities
- `GET /communities/{id}/members` → See members of a community
- `GET /communities/search?name=` → Search by community name

### 🧵 Community Posts
- `POST /community-posts` → Create post in a community
- `GET /community-posts/by-community/{id}` → View posts in a specific community
- `GET /community-posts/by-user` → View your community posts
- `PUT /community-posts/{id}` → Edit your community post
- `DELETE /community-posts/{id}` → Delete own post
- `DELETE /community-posts/admin/{id}` → Admin delete post

### ❤️ Likes & Comments
- `POST /posts/{postId}/like` → Like a post
- `DELETE /posts/{postId}/like` → Unlike a post
- `POST /posts/{postId}/comment` → Add comment
- `GET /posts/{postId}/comments` → View comments
- `PUT /posts/comments/{commentId}` → Edit own comment
- `DELETE /posts/comments/{commentId}` → Delete own comment
- `DELETE /posts/admin/comments/{commentId}` → Admin delete comment

### 🔔 Notifications
- `GET /api/notifications` → View all notifications
- `PUT /api/notifications/{id}/read` → Mark notification as read

---

## 🧠 Design Patterns Used

This project uses several object-oriented design principles and patterns to ensure maintainability, modularity, and scalability:

- **Strategy Pattern**  
  Used to handle different types of user interactions (like, comment) via the `Interaction` interface and its implementations (`LikeInteraction`, `CommentInteraction`). This allows new types of interactions to be added easily without modifying notification logic.

- **Builder Pattern (via Lombok)**  
  Used across model entities (e.g., `Notification`, `Like`) with `@Builder` to construct objects in a readable and clean manner.

- **Template-like Notification Handling**  
  Notifications are built using a consistent template flow, relying on the polymorphism provided by the interaction strategy interface.


---

Would you like me to append this automatically to the full `README.md` content I gave earlier?


## 📚 Project Structure
spring-blog-app/
├── Backend/
│ └── BlogApp/ ← Spring Boot source code
├── Frontend/ ← Frontend (to be added)



---

## 🧪 Testing Status
- ✅ Backend tested via Postman
- ✅ Ownership validation, security, and edge cases verified
- 🚧 Frontend integration planned (with React)

---

## 🤝 Collaboration

Frontend will be developed and integrated 

---

## 📌 Planned Features
- Trending page (most liked posts)
- Swagger API documentation
- Global exception handling
- DTO usage for cleaner responses

---



