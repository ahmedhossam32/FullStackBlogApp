# 📘 Backend API & Architecture — Spring Blog App

---

## ✅ Technologies Used

- Java 17, Spring Boot 3
- Spring Security + JWT
- Hibernate (JPA)
- MySQL
- Postman (testing)
- Lombok

---

## 📜 Authentication

- `POST /auth/signup` → register a new user
- `POST /auth/login` → returns JWT token
- Secured endpoints require JWT in `Authorization` header

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

- JWT authentication with `JwtAuthFilter`
- User injected into requests via `@RequestAttribute("user")`
- Service layer validates ownership for edit/delete
- Unauthorized users blocked at controller level

---

## 🧠 Design Patterns Used

| Pattern              | Usage Location                                      | Purpose |
|----------------------|-----------------------------------------------------|---------|
| Strategy Pattern     | `Interaction`, `LikeInteraction`, `CommentInteraction` | Dynamic notification generation for different actions |
| Builder Pattern      | Lombok `@Builder` in entities                       | Clean object construction |
| Template-like Pattern| Notification flow via reusable message logic       | Consistent structure in feedback |
| Clean Architecture   | Controller → Service → Repository                   | Code modularity, readability, testability |

---

## 🔄 Data Relationships

- `User` ↔ `BlogPost` → OneToMany
- `BlogPost` ↔ `Like`, `Comment`, `Notification` → OneToMany
- `User` ↔ `Notification` → ManyToOne
- `User` ↔ `Community` (as member and owner) → ManyToMany + ManyToOne

---

## 📌 Other Details

- Cascade deletion: when a blog is deleted, related likes/comments/notifications are deleted automatically
- Notifications handled via **Strategy Pattern**
- Fully tested with Postman for all edge cases (ownership, auth, invalid actions)

---

## 🧪 Testing Summary

- ✅ Auth: Signup/Login
- ✅ Blog CRUD
- ✅ Comments + Likes + Notifications
- ✅ Community join/post/leave
- ✅ Admin tools (delete anything)
- ✅ Invalid cases and security tested

---

## 🔮 Planned Enhancements

- Trending page based on most liked posts
- Swagger docs
- Global exception handling with `@ControllerAdvice`
- DTO usage for secure, structured responses
- Frontend integration in React
