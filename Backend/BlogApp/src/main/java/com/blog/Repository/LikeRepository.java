package com.blog.Repository;

import com.blog.Model.Like;
import com.blog.Model.Post;
import com.blog.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPost(Post post);
    Optional<Like> findByUserAndPost(User user, Post post);
}
