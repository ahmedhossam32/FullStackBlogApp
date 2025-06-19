package com.blog.Controller;

import com.blog.Model.Comment;
import com.blog.Model.User;
import com.blog.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


    @PostMapping("/{postId}/comment")
    public ResponseEntity<String> addComment(@PathVariable Long postId,
                                             @RequestBody Map<String, String> body,
                                             @RequestAttribute("user") User user) {
        String content = body.get("content");
        String response = commentService.addComment(postId, content, user);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<String> editComment(@PathVariable Long commentId,
                                              @RequestBody Map<String, String> body,
                                              @RequestAttribute("user") User user) {
        String newContent = body.get("content");
        String result = commentService.editComment(commentId, newContent, user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId,
                                                @RequestAttribute("user") User user) {
        String result = commentService.deleteComment(commentId, user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/admin/comments/{commentId}")
    public ResponseEntity<String> adminDeleteComment(@PathVariable Long commentId,
                                                     @RequestAttribute("user") User requester) {
        String result = commentService.adminDeleteComment(commentId, requester);
        return ResponseEntity.ok(result);
    }
}
