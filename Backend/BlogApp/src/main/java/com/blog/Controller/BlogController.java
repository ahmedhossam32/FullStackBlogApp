package com.blog.Controller;

import com.blog.Model.BlogPost;
import com.blog.Model.User;
import com.blog.Service.BlogPostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity<String> createBlog(@RequestBody BlogPost blogPost, HttpServletRequest request) {
        User user = (User) request.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized: missing user");
        }
        blogPostService.createBlogPost(blogPost, user);
        return ResponseEntity.ok("Blog created successfully");
    }




    @GetMapping
    public List<BlogPost> getAllBlogs() {
        return blogPostService.getAllBlogs();
    }


    @GetMapping("/user")
    public List<BlogPost> getUserBlogs(@RequestAttribute("user") User user) {
        return blogPostService.getBlogsByUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBlog(@PathVariable Long id,
                                             @RequestBody BlogPost blogPost,
                                             @RequestAttribute("user") User user) {
        String result = blogPostService.updateBlog(id, blogPost, user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id, @RequestAttribute("user") User user) {
        String result = blogPostService.deleteBlog(id, user);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/search")
    public List<BlogPost> searchBlogs(@RequestParam String title) {
        return blogPostService.getBlogbyTitle(title);
    }
}
