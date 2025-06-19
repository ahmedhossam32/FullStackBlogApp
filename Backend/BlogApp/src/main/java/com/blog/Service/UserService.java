package com.blog.Service;

import com.blog.Model.User;
import com.blog.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public String signup(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));


        user.setRole("ROLE_USER");

        userRepository.save(user);
        return "User registered successfully";
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
