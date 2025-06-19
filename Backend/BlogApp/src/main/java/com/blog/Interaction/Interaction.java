package com.blog.Interaction;

import com.blog.Model.Post;
import com.blog.Model.User;

public interface Interaction {
    String getMessage();           // Message to send in notification
    User getRecipient();           // Blog owner (who receives notification)
    Post getPost();            // Related blog
}
