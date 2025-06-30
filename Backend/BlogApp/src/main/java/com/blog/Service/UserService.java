package com.blog.Service;

import com.blog.Model.User;
import com.blog.Repository.BlogPostRepository;
import com.blog.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BlogPostRepository  blogPostRepository;


    public String signup(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken";
        }

        if (user.getProfileImage() == null || user.getProfileImage().trim().isEmpty()) {
            user.setProfileImage("/uploads/default-avatar.png"); // default image
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return "Signup successful";
    }



    public Map<String, Object> getUserSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int blogCount = blogPostRepository.countByUserId(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("name", user.getName());
        response.put("blogCount", blogCount);
        response.put("memberSince", user.getCreatedAt().toLocalDate());

        return response;
    }


    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public String login(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isEmpty()) {
            return "User not found";
        }

        User dbUser = existingUser.get();

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return "Incorrect password";
        }

        return "Login successful";
    }

    public List<User> getAllUsers(User requester) {
        if (!requester.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username)
    {
      return  userRepository.findByUsername(username);
    }
}
