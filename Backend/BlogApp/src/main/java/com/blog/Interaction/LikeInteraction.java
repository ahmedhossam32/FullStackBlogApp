package com.blog.Interaction;

import com.blog.Model.BlogPost;
import com.blog.Model.Post;
import com.blog.Model.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LikeInteraction implements Interaction {

    private final User actor;
    private final Post post;

    @Override
    public String getMessage() {
        return actor.getUsername() + " liked your blog post: " + post.getTitle();
    }

    @Override
    public User getRecipient() {
        return post.getUser();
    }

    @Override
    public Post getPost() {
        return post;
    }
}
