package com.blog.Controller;

import com.blog.Model.Comment;
import com.blog.Model.Community;
import com.blog.Model.CommunityPost;
import com.blog.Model.Like;
import com.blog.Model.User;
import com.blog.Service.CommunityPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community-posts")
@RequiredArgsConstructor
public class CommunityPostController {

    @Autowired
    private final CommunityPostService communityPostService;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody CommunityPost post,
                                             @RequestAttribute("user") User user) {
        String response = communityPostService.createPost(post, user);
        return ResponseEntity.ok(response);
    }

    // ✅ UPDATED: Return real likes and commentIds
    @GetMapping("/by-community/{communityId}")
    public ResponseEntity<List<Map<String, Object>>> getPostsByCommunity(@PathVariable Long communityId) {
        Community community = new Community();
        community.setId(communityId);
        List<CommunityPost> posts = communityPostService.getAllCommunityPosts(community);

        List<Map<String, Object>> response = posts.stream().map(post -> {
            Map<String, Object> postMap = new HashMap<>();
            postMap.put("id", post.getId());
            postMap.put("title", post.getTitle());
            postMap.put("content", post.getContent());
            postMap.put("createdAt", post.getCreatedAt());
            postMap.put("updatedAt", post.getUpdatedAt());

            postMap.put("commentIds", post.getComments()
                    .stream().map(Comment::getId).collect(Collectors.toList()));

            postMap.put("likes", post.getLikes()
                    .stream().map(like -> Map.of("userId", like.getUser().getId()))
                    .collect(Collectors.toList()));

            return postMap;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-user")
    public List<CommunityPost> getUserPosts(@RequestAttribute("user") User user) {
        return communityPostService.getPostsByUser(user);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Long postId,
                                             @RequestBody CommunityPost updatedPost,
                                             @RequestAttribute("user") User user) {
        String result = communityPostService.updatePost(postId, updatedPost, user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId,
                                             @RequestAttribute("user") User user) {
        String result = communityPostService.deletePost(postId, user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/admin/{postId}")
    public ResponseEntity<String> adminDeletePost(@PathVariable Long postId) {
        String result = communityPostService.adminDeletePost(postId);
        return ResponseEntity.ok(result);
    }
}
