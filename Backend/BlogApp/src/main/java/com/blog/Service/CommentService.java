package com.blog.Service;

import com.blog.Interaction.CommentInteraction;
import com.blog.Model.*;
import com.blog.Repository.BlogPostRepository;
import com.blog.Repository.CommentRepository;
import com.blog.Repository.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;

    @Autowired
    private final BlogPostRepository blogPostRepository;

    @Autowired
    private final CommunityPostRepository communityPostRepository;

    @Autowired
    private final NotificationService notificationService;


    public Post getThisPost(Long postId) {
        return blogPostRepository.findById(postId)
                .map(post -> (Post) post)
                .or(() -> communityPostRepository.findById(postId).map(cp -> (Post) cp))
                .orElse(null);
    }


    public String addComment(Long postId, String content, User user) {
        Post post = getThisPost(postId);
        if (post == null) {
            return "Post not found";
        }

        Comment comment = Comment.builder()
                .content(content)
                .createdAt(LocalDateTime.now())
                .user(user)
                .post(post)
                .build();

        commentRepository.save(comment);
        notificationService.notify(new CommentInteraction(user, post));

        return "Comment added successfully";
    }


    public List<Comment> getCommentsByPost(Long postId) {
        Post post = getThisPost(postId);
        if (post == null) {
            throw new RuntimeException("Post not found");
        }
        return commentRepository.findByPost(post);
    }


    public String editComment(Long commentId, String newContent, User user) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isEmpty()) {
            return "Comment not found";
        }

        Comment comment = optionalComment.get();

        if (!comment.getUser().getId().equals(user.getId())) {
            return "You are not allowed to edit this comment";
        }

        comment.setContent(newContent);
        commentRepository.save(comment);

        return "Comment updated successfully";
    }


    public String deleteComment(Long commentId, User user) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isEmpty()) {
            return "Comment not found";
        }

        Comment comment = optionalComment.get();

        if (!comment.getUser().getId().equals(user.getId())) {
            return "You are not allowed to delete this comment";
        }

        commentRepository.delete(comment);
        return "Comment deleted successfully";
    }

    public String adminDeleteComment(Long commentId, User requester) {
        if (!requester.getRole().equalsIgnoreCase("ADMIN")) {
            return "Unauthorized";
        }

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            return "Comment not found";
        }

        commentRepository.delete(optionalComment.get());
        return "Comment deleted by admin";
    }
}
