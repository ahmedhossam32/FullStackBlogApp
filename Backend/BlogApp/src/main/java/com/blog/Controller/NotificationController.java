package com.blog.Controller;

import com.blog.Model.Notification;
import com.blog.Model.User;
import com.blog.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<Notification> getUserNotifications(@RequestAttribute("user") User user) {
        return notificationService.getNotificationsForUser(user);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId,
                                             @RequestAttribute("user") User user) {
        String result = notificationService.markAsRead(notificationId, user);
        return ResponseEntity.ok(result);
    }

}

