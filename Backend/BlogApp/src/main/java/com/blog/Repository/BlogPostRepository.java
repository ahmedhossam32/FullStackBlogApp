package com.blog.Repository;

import com.blog.Model.BlogPost;
import com.blog.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByUser(User user);
    List<BlogPost> findByTitleContainingIgnoreCase(String title);
}
