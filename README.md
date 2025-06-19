# 📘 Backend API & Architecture — Spring Blog App

---

## ✅ Technologies Used

- Java 17
- Spring Boot 3
- Spring Security + JWT
- Hibernate (JPA)
- MySQL
- Lombok
- Postman (for API testing)

---

## 📦 Project Structure

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

## 📜 Authentication

- `POST /auth/signup` → Register new user
- `POST /auth/login` → Get JWT token
- Pass token via `Authorization: Bearer <token>` header

---

## 👥 Roles & Permissions

### 👤 USER (ROLE_USER)
- Create, edit, delete own blogs
- Join, leave, and create communities
- Post in communities
- Like/unlike and comment on any post
- View and mark notifications
- Search blogs/communities

### 👑 ADMIN (ROLE_ADMIN)
- View/delete any blog, comment, community, or community post
- View all users

---

## 📄 Blog Endpoints

- `POST /blogs` → Create blog
- `GET /blogs` → Get all blogs
- `GET /blogs/user` → Get user's blogs
- `PUT /blogs/{id}` → Update blog
- `DELETE /blogs/{id}` → Delete blog
- `GET /blogs/search?title=` → Search blogs

---

## 🏘 Community Endpoints

- `POST /communities` → Create a community (auto joins user)
- `DELETE /communities/{id}` → Delete (owner only)
- `POST /communities/{id}/join` → Join a community
- `POST /communities/{id}/leave` → Leave a community
- `GET /communities` → Browse all
- `GET /communities/joined` → View joined communities
- `GET /communities/{id}/members` → View members
- `GET /communities/search?name=` → Search by name

---

## 🧵 Community Post Endpoints

- `POST /community-posts` → Create a community post
- `GET /community-posts/by-community/{id}` → Get posts by community
- `GET /community-posts/by-user` → Get user's posts
- `PUT /community-posts/{id}` → Update post
- `DELETE /community-posts/{id}` → Delete post
- `DELETE /community-posts/admin/{id}` → Admin delete

---

## ❤️ Like Endpoints

- `POST /posts/{postId}/like` → Like a post
- `DELETE /posts/{postId}/like` → Unlike a post

---

## 💬 Comment Endpoints

- `POST /posts/{postId}/comment` → Add comment
- `GET /posts/{postId}/comments` → Get comments
- `PUT /posts/comments/{commentId}` → Edit comment
- `DELETE /posts/comments/{commentId}` → Delete comment
- `DELETE /posts/admin/comments/{commentId}` → Admin delete

---

## 🔔 Notification Endpoints

- `GET /api/notifications` → Get user notifications
- `PUT /api/notifications/{id}/read` → Mark notification as read

---

## 🔒 Security Design

- JWT authentication via `JwtAuthFilter`
- Logged-in user injected using `@RequestAttribute("user")`
- All secured actions checked for user ownership in service layer
- Unauthorized actions blocked by role/ownership validation

---

## 🧠 Design Patterns Used

| Pattern              | Usage Location                                      | Purpose |
|----------------------|-----------------------------------------------------|---------|
| Strategy Pattern     | `Interaction`, `LikeInteraction`, `CommentInteraction` | Dynamic notification handling based on action type |
| Builder Pattern      | Lombok `@Builder` in model entities                | Clean, chainable object creation |
| Template-like Pattern| Reusable notification construction logic           | Keeps consistency and extensibility |
| Clean Architecture   | Controller → Service → Repository                   | Clear separation of concerns |

---

## 🔄 Data Relationships

- `User` ↔ `BlogPost` → OneToMany
- `BlogPost` ↔ `Like`, `Comment`, `Notification` → OneToMany
- `User` ↔ `Notification` → ManyToOne
- `User` ↔ `Community` (as member and owner) → ManyToMany + ManyToOne
- `Community` ↔ `CommunityPost` → OneToMany

---

## 📌 Other Details

- Cascade delete: when a blog or community post is deleted, related likes/comments/notifications are also deleted automatically
- Notifications are decoupled from controller logic using the **Strategy pattern**
- Entities validated via user ownership or admin role in service layer
- Fully tested using Postman (including edge cases, bad tokens, and unauthorized access)

---

## 🧪 Testing Summary

- ✅ Authentication (signup/login)
- ✅ Blog post CRUD
- ✅ Community create/join/post/leave
- ✅ Comments and likes with notification
- ✅ Admin moderation routes
- ✅ Edge cases: invalid access, missing tokens, foreign ownership

---

## 🔮 Planned Enhancements

- 🔝 Trending page (top liked posts)
- 📄 Swagger/OpenAPI documentation
- 📦 Global exception handling with `@ControllerAdvice`
- 🔒 Secure DTO-base
