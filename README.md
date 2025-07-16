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


## 🎥 Demo Video

Want to see the app in action?  
👉 [Watch the project walkthrough on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7347253574084493313/)

---
## 🖼️ Screenshots (with explanations)

### 1. Home Page
![HomePage](./Screenshots/HomePage.png)  
The landing page when a user visits the web app for the first time.

---

### 2. Sign In
![Signin](./Screenshots/Signin.png)  
User signs in to access features like writing, liking, and commenting.

---

### 3. Sign Up
![SignUp](./Screenshots/SignUp.png)  
User registration screen with name, email, date of birth, optional profile picture, username (must be unique), and password.

---

### 4. Feed Page
![FYP1](./Screenshots/FYP1.png)  
Feed showing all public blogs sorted by newest first. Users can like, comment, and explore other blogs.

---

### 5. Blogs List – Page 1
![Blogs1](./Screenshots/Blogs1.png)  
User browsing various blogs, each showing number of likes and comments.

---

### 6. Blogs List – Page 2
![Blogs2](./Screenshots/Blogs2.png)  
Continuation of the blog feed.

---

### 7. Liked Blogs
![Blogs3Liked](./Screenshots/Blogs3Liked.png)  
User liked several posts including "How I Stayed Focused" and "Coding Daily".

---

### 8. Blog by Olivia – Page 1
![Blogs4](./Screenshots/Blogs4.png)  
User reading Olivia's blog about solo travel.

---

### 9. Blog by Olivia – Page 2
![blogs5](./Screenshots/blogs5.png)  
Continuation of Olivia’s blog and user liked it.

---

### 10. Commented on Post
![Commented](./Screenshots/Commented.png)  
User commented on Olivia’s post. Other comments are visible too.

---

### 11. Edit/Delete Comment
![EditAndDeleteComment](./Screenshots/EditAndDeleteComment.png)  
User can edit or delete their own comment.

---

### 12. Create a Blog Post – Step 1
![PostBlog1](./Screenshots/PostBlog1.png)  
User opens the blog creation form.

---

### 13. Create a Blog Post – Step 2
![PostBlog2](./Screenshots/PostBlog2.png)  
User enters title, content, and uploads an image.

---

### 14. Blog Post Added
![MyPostAdded](./Screenshots/MyPostAdded.png)  
New blog appears in the public feed alongside others.

---

### 15. Search Blogs
![SearchBlogs](./Screenshots/SearchBlogs.png)  
Search by keyword (e.g., “Java”) returns relevant blogs.

---

### 16. Added New Post
![AddednewPost](./Screenshots/AddednewPost.png)  
User added another blog post to the platform.

---

### 17. My Blogs Page
![MyBlogs](./Screenshots/MyBlogs.png)  
User accesses their own blogs via the "My Blogs" page.

---

### 18. Edit/Delete Options
![myblogsEditorDelete](./Screenshots/myblogsEditorDelete.png)  
User can choose to edit or delete their own blog.

---

### 19. Edit Blog
![EditMyBlog](./Screenshots/EditMyBlog.png)  
Blog editor to modify title, content, or image.

---

### 20. Delete Blog
![DeleteMyblog](./Screenshots/DeleteMyblog.png)  
Confirmation and ability to delete the blog post.

---

### 21. Notification: Liked
![NotificationLiked](./Screenshots/NotifcationLiked.png)
User receives a notification when someone likes their blog.

---

### 22. Notification: Commented
![NotificationCommented](./Screenshots/NotifcationCommented.png)  
User is notified when someone comments on their blog.

---

### 23. Notification Toast
![NotificationLiked](./Screenshots/NotifcationLiked.png)
Toast popup allows user to mark notification as read or dismiss it.

---

### 24. Comments on Blog – Page 1
![MyPostComments](./Screenshots/MyPostComments.png)  
User views comments on their own blog (e.g., “Java Code”).

---

### 25. Comments on Blog – Page 2
![MyPostComments2](./Screenshots/MyPostComments2.png)  
Another post (e.g., “Waking Up Early”) with comments.

---

### 26. Account Details
![MyAccountDetails](./Screenshots/MyAccountDetails.png)  
Displays user’s name, username, email, stats (total blogs, likes, comments), and recent activity.

---

### 27. Logout Options
![LogoutSignout](./Screenshots/LogoutSignout.png)  
User can logout via the red button or from the sidebar under the profile picture.

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


