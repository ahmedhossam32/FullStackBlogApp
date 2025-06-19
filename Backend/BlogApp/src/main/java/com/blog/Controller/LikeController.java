package com.blog.Controller;

import com.blog.Model.User;
import com.blog.Service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable Long postId,
                                           @RequestAttribute("user") User user) {
        String response = likeService.likePost(postId, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId,
                                             @RequestAttribute("user") User user) {
        String response = likeService.unlikePost(postId, user);
        return ResponseEntity.ok(response);
    }
}
