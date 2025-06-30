# 🛠️ Blog App — Backend

This is the **backend API** of the Full Stack Blog Application. It handles user authentication, blog and community post management, comments, likes, notifications, and role-based access control using Spring Boot, Spring Security (with JWT), and Hibernate (JPA).

---

## 📐 Architecture

The backend follows a clean layered architecture:

Controller → Service → Repository → Entity



- **Controller**: Handles HTTP requests & routes
- **Service**: Business logic, authentication, authorization, validation
- **Repository**: Data access using Spring Data JPA
- **Entity**: Mapped to DB tables via Hibernate annotations

---

## 🔐 Authentication & Authorization

### ✅ JWT-Based Login

- Upon login, the user receives a **JWT token**.
- JWT is passed in the `Authorization` header with `Bearer <token>`.
- Used to secure protected endpoints.

### 🔄 Flow

1. **Signup** (`/auth/signup`)
   - Stores user details securely (password hashed)
   - Profile picture upload supported

2. **Login** (`/auth/login`)
   - Validates credentials
   - Returns JWT on success

3. **Spring Security Config**:
   - Custom `JwtAuthFilter` extracts and validates tokens
   - Access granted based on roles (`ROLE_USER`, `ROLE_ADMIN`)
   - Stateless session (RESTful)

---

## 👥 Roles

### ROLE_USER:
- Sign up / Login
- Create, edit, delete own blog posts
- Like / unlike posts
- Comment on posts
- Join / leave communities
- Create / delete community posts
- View notifications
- Search blogs and communities

### ROLE_ADMIN:
- View and delete any blog, comment, or community
- Moderate community content
- View all users, posts, and metadata

---

## 🔧 Technologies Used

- **Java 17**
- **Spring Boot**
- **Spring Security (JWT)**
- **Hibernate (JPA)**
- **PostgreSQL**
- **Lombok**
- **Postman** (for API testing)

---

## 📁 Modules

### 📝 Blog Post Management

- `POST /blogs` – Create a blog
- `GET /blogs` – View all blogs
- `GET /blogs/user` – View own blogs
- `PUT /blogs/{id}` – Update own blog
- `DELETE /blogs/{id}` – Delete own blog
- `GET /blogs/search?title=xyz` – Search by title

### 💬 Comments

- `POST /posts/{postId}/comment` – Add comment
- `GET /posts/{postId}/comments` – View comments
- `PUT /posts/comments/{commentId}` – Edit own comment
- `DELETE /posts/comments/{commentId}` – Delete own comment
- `DELETE /posts/admin/comments/{commentId}` – Admin delete comment

### 👍 Likes

- `POST /posts/{postId}/like` – Like a post
- `DELETE /posts/{postId}/like` – Unlike a post

### 🔔 Notifications

- Triggered when a blog or community post is liked or commented on
- `GET /api/notifications` – View user notifications
- `PUT /api/notifications/{id}/read` – Mark as read
- Delivered as toast popups in frontend via Observer pattern

---

## 🏘️ Community Module

### Users Can:
- `POST /communities` – Create a community (auto-joins creator)
- `DELETE /communities/{id}` – Delete owned community
- `POST /communities/{id}/join` – Join community
- `POST /communities/{id}/leave` – Leave community
- `GET /communities` – View all communities
- `GET /communities/joined` – View joined communities
- `GET /communities/{id}/members` – View members
- `GET /communities/search?name=xyz` – Search by name

### Posts in Communities:
- `POST /community-posts` – Create community post
- `GET /community-posts/by-community/{communityId}` – View community posts
- `GET /community-posts/by-user` – View own community posts
- `PUT /community-posts/{id}` – Edit post
- `DELETE /community-posts/{id}` – Delete own post
- `DELETE /community-posts/admin/{id}` – Admin delete

---

## 🧪 Testing

- Manual testing via **Postman**
- All endpoints tested for:
  - Unauthorized access
  - Role-based restrictions
  - Edge cases (e.g. deleting non-owned posts)

---

## 🧠 Highlights of Work

✅ Full implementation of **JWT + Spring Security**

✅ All entities properly mapped using **JPA annotations**

✅ **Validation**, error handling, and custom exceptions

✅ REST APIs follow **best practices** (HTTP verbs, status codes)

✅ Roles & permissions respected throughout all routes

✅ Notifications system built using **Observer Pattern**

✅ Clean architecture & well-separated concerns

---

## 📌 Setup

1. Create PostgreSQL DB and configure in `application.properties`
2. Run the project with:
```bash
./mvnw spring-boot:run
