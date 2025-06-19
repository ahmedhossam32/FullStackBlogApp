package com.blog.Service;

import com.blog.Model.Community;
import com.blog.Model.CommunityPost;
import com.blog.Model.User;
import com.blog.Repository.CommunityPostRepository;
import com.blog.Repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityPostService {

    @Autowired
    private final CommunityPostRepository communityPostRepository;

    @Autowired
    private final CommunityRepository communityRepository;

    public String createPost(CommunityPost communityPost, User user) {
        Long communityId = communityPost.getCommunity().getId();
        Community fullCommunity = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        if (!fullCommunity.getMembers().contains(user)) {
           return "You are not a member of this community";
        }

        communityPost.setUser(user);
        communityPost.setCommunity(fullCommunity); // ensure proper relation
        communityPost.setCreatedAt(LocalDateTime.now());
        communityPost.setUpdatedAt(LocalDateTime.now());

        communityPostRepository.save(communityPost);

        return "Community post created";
    }



    public List<CommunityPost> getAllCommunityPosts(Community community) {
        return communityPostRepository.findByCommunity(community);
    }


    public List<CommunityPost> getPostsByUser(User user) {
        return communityPostRepository.findByUser(user);
    }

    public String updatePost(Long postId, CommunityPost updatedPost, User user) {
        Optional<CommunityPost> optional = communityPostRepository.findById(postId);

        if (optional.isEmpty()) {
            return "Post not found";
        }

        CommunityPost post = optional.get();

        if (!post.getUser().getId().equals(user.getId())) {
            return "You are not authorized to update this post";
        }

        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        post.setUpdatedAt(LocalDateTime.now());

        communityPostRepository.save(post);
        return "Post updated successfully";
    }



    public String deletePost(Long postId, User user) {
        Optional<CommunityPost> optional = communityPostRepository.findById(postId);

        if (optional.isEmpty()) {
            return "Post not found";
        }

        CommunityPost post = optional.get();

        if (!post.getUser().getId().equals(user.getId())) {
            return "You are not authorized to delete this post";
        }

        communityPostRepository.delete(post);
        return "Post deleted successfully";
    }


    public String adminDeletePost(Long postId) {
        Optional<CommunityPost> optional = communityPostRepository.findById(postId);

        if (optional.isEmpty()) {
            return "Post not found";
        }

        communityPostRepository.delete(optional.get());
        return "Post deleted by admin";
    }
}
