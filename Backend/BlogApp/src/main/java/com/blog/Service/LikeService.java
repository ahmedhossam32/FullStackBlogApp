package com.blog.Service;

import com.blog.Interaction.LikeInteraction;
import com.blog.Model.*;
import com.blog.Repository.BlogPostRepository;
import com.blog.Repository.CommunityPostRepository;
import com.blog.Repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final NotificationService notificationService;
    private final BlogPostRepository blogPostRepository;
    private final CommunityPostRepository communityPostRepository;


    public Post getThisPost(Long postId) {
        return blogPostRepository.findById(postId)
                .map(post -> (Post) post)
                .or(() -> communityPostRepository.findById(postId).map(cp -> (Post) cp))
                .orElse(null);
    }


    public String likePost(Long postId, User user) {
        Post post = getThisPost(postId);

        if (post == null) {
            return "Post not found";
        }

        Optional<Like> existingLike = likeRepository.findByUserAndPost(user, post);
        if (existingLike.isPresent()) {
            return "You already liked this post";
        }

        Like like = Like.builder()
                .user(user)
                .post(post)
                .createdAt(LocalDateTime.now())
                .build();

        likeRepository.save(like);
        notificationService.notify(new LikeInteraction(user, post));

        return "Post liked successfully";
    }

    public String unlikePost(Long postId, User user) {
        Post post = getThisPost(postId);

        if (post == null) {
            return "Post not found";
        }

        Optional<Like> existingLike = likeRepository.findByUserAndPost(user, post);
        if (existingLike.isEmpty()) {
            return "You have not liked this post";
        }

        likeRepository.delete(existingLike.get());
        return "Post unliked successfully";
    }
}
