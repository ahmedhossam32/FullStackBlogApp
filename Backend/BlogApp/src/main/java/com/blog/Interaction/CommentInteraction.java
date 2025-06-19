package com.blog.Interaction;

import com.blog.Model.BlogPost;
import com.blog.Model.Post;
import com.blog.Model.User;

public class CommentInteraction implements Interaction {

    private final User actor;
    private final Post post;

    public CommentInteraction(User actor, Post post) {
        this.actor = actor;
        this.post=post;
    }

    @Override
    public String getMessage() {
        return actor.getUsername() + " commented on your blog post: " + post.getTitle();
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
