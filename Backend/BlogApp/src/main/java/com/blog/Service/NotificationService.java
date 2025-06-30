package com.blog.Service;

import com.blog.Interaction.Interaction;
import com.blog.Model.Notification;
import com.blog.Model.User;
import com.blog.Repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void notify(Interaction interaction) {
        Notification notification = Notification.builder()
                .message(interaction.getMessage())
                .timestamp(LocalDateTime.now())
                .read(false)
                .recipient(interaction.getRecipient())
                .post(interaction.getPost())
                .build();

        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(User user) {
        List<Notification> notifications = notificationRepository.findByRecipient(user);
        for (Notification n : notifications) {
            if (n.getPost() != null) {
                n.setPostId(n.getPost().getId()); // ✅ Only fetch ID, no deep joins
            }
        }
        return notifications;
    }

    public String markAsRead(Long notificationId, User user) {
        Optional<Notification> optional = notificationRepository.findById(notificationId);

        if (optional.isEmpty()) {
            return "Notification not found";
        }

        Notification notification = optional.get();

        if (!notification.getRecipient().getId().equals(user.getId())) {
            return "You are not allowed to mark this notification";
        }

        if (!notification.isRead()) {
            notification.setRead(true);
            notificationRepository.save(notification);
            return "Notification marked as read";
        } else {
            return "Notification already marked as read";
        }
    }
}
