package com.blog.Controller;

import com.blog.Config.JwtUtil;
import com.blog.Model.User;
import com.blog.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {

        if (user.getProfileImage() == null || user.getProfileImage().trim().isEmpty()) {
            user.setProfileImage("/uploads/default-avatar.png"); // ✅ ensure this default file exists
        }

        String response = userService.signup(user);

        if ("Username already taken".equals(response)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userService.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty() ||
                !passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        User user = userOpt.get();
        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", "Bearer " + token,
                "user", user
        ));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestAttribute("user") User requester) {
        List<User> users = userService.getAllUsers(requester);
        return ResponseEntity.ok(users);
    }
}
