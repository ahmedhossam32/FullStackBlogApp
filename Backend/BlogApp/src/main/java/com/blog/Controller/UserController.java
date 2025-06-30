package com.blog.Controller;

import com.blog.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to return blog, comment, like counts
    @GetMapping("/users/{userId}/summary")
    public ResponseEntity<Map<String, Object>> getUserSummary(@PathVariable Long userId) {
        Map<String, Object> summary = userService.getUserSummary(userId);
        return ResponseEntity.ok(summary);
    }

    // Endpoint to upload user profile image
    @PostMapping("/users/upload-image")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("No image selected");
        }

        String uploadDir = "uploads/";
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();

        try {
            Path filePath = Paths.get(uploadDir + filename);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, image.getBytes());

            // Return path to be saved in DB and sent to frontend
            return ResponseEntity.ok("/" + uploadDir + filename);
        } catch (IOException e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image");
        }
    }
}
