package com.blog.Controller;

import com.blog.Dto.BlogPostDto;
import com.blog.Model.BlogPost;
import com.blog.Model.User;
import com.blog.Service.BlogPostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public List<BlogPostDto> getAllBlogs() {
        return blogPostService.getAllBlogs();
    }

    @GetMapping("/user/stats")
    public ResponseEntity<Map<String, Integer>> getUserStats(@RequestAttribute("user") User user) {
        int blogCount = blogPostService.countUserBlogs(user);
        int likeCount = blogPostService.countLikesOnUserBlogs(user);
        int commentCount = blogPostService.countCommentsOnUserBlogs(user);

        Map<String, Integer> stats = Map.of(
                "blogCount", blogCount,
                "likeCount", likeCount,
                "commentCount", commentCount
        );

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/user/recent")
    public ResponseEntity<List<BlogPostDto>> getRecentBlogs(@RequestAttribute("user") User user) {
        List<BlogPost> recentBlogs = blogPostService.getRecentBlogsByUser(user, 3);
        List<BlogPostDto> dtos = recentBlogs.stream()
                .map(blogPostService::convertToDto)
                .toList();
        return ResponseEntity.ok(dtos);
    }



    @GetMapping("/user")
    public List<BlogPostDto> getUserBlogs(@RequestAttribute("user") User user) {
        return blogPostService.getBlogsByUser(user).stream()
                .map(blogPostService::convertToDto)
                .toList();
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

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDto> getBlogById(@PathVariable Long id) {
        BlogPostDto blog = blogPostService.getBlogById(id);
        if (blog == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(blog);
    }

    @GetMapping("/search")
    public List<BlogPost> searchBlogs(@RequestParam String title) {
        return blogPostService.getBlogbyTitle(title);
    }

    @GetMapping("/{id}/liked-by-me")
    public ResponseEntity<Map<String, Boolean>> isLikedByCurrentUser(
            @PathVariable Long id,
            @RequestAttribute("user") User user // Injected by your JwtAuthFilter
    ) {
        boolean liked =blogPostService .isPostLikedByUser(id, user);
        return ResponseEntity.ok(Collections.singletonMap("liked", liked));
    }

    @CrossOrigin(origins = "http://localhost:3000") // or your frontend domain
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads", filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // Return URL to frontend
            return ResponseEntity.ok("/uploads/" + filename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image");
        }
    }

}
