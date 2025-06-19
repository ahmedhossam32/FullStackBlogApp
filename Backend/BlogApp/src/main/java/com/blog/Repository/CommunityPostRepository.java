package com.blog.Repository;

import com.blog.Model.CommunityPost;
import com.blog.Model.Community;
import com.blog.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByCommunity(Community community);
    List<CommunityPost> findByUser(User user);}
