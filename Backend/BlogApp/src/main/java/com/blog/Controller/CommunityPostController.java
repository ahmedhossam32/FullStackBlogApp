package com.blog.Controller;

import com.blog.Model.Community;
import com.blog.Model.CommunityPost;
import com.blog.Model.User;
import com.blog.Service.CommunityPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @GetMapping("/by-community/{communityId}")
    public List<CommunityPost> getPostsByCommunity(@PathVariable Long communityId) {
        Community community = new Community();
        community.setId(communityId);
        return communityPostService.getAllCommunityPosts(community);
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
