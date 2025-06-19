package com.blog.Repository;

import com.blog.Model.Notification;
import com.blog.Model.Post;
import com.blog.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipient(User user);
    List<Notification> findByPost(Post post);
}
