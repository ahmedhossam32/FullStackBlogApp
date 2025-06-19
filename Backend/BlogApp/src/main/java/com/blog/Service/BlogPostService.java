package com.blog.Service;

import com.blog.Model.*;
import com.blog.Repository.BlogPostRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class BlogPostService {

    @Autowired
    BlogPostRepository blogPostRepository;

    public void createBlogPost(BlogPost blogPost, User user) {
        blogPost.setUser(user);
        blogPostRepository.save(blogPost);
    }


    public List<BlogPost> getAllBlogs() {
        return blogPostRepository.findAll();
    }

    public List<BlogPost> getBlogsByUser(User user) {
        return blogPostRepository.findByUser(user);
    }


    public String updateBlog(Long blogId, BlogPost updatedBlog, User user) {
        Optional<BlogPost> blogOpt = blogPostRepository.findById(blogId);

        if (blogOpt.isEmpty()) {
            return "Blog not found";
        }

        if (!validateBlog(blogId, user)) {
            return "You are not authorized to update this blog";
        }

        BlogPost existingBlog = blogOpt.get();
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setContent(updatedBlog.getContent());
        existingBlog.setUpdatedAt(updatedBlog.getUpdatedAt());

        blogPostRepository.save(existingBlog);
        return "Blog updated successfully";
    }


    private boolean validateBlog(Long blogId, User user) {
        Optional<BlogPost> blogOpt = blogPostRepository.findById(blogId);

        if (blogOpt.isEmpty()) {
            return false;
        }

        BlogPost blog = blogOpt.get();
        return blog.getUser().getId().equals(user.getId());
    }


    public String deleteBlog(Long blogId, User user) {
        Optional<BlogPost> blogOpt = blogPostRepository.findById(blogId);

        if (blogOpt.isEmpty()) return "Blog not found";

        BlogPost blog = blogOpt.get();


        if (user.getRole().equals("ROLE_ADMIN")) {
            blogPostRepository.deleteById(blogId);
            return "Blog deleted successfully by admin";
        }

        if (validateBlog(blogId, user)) {
            blogPostRepository.deleteById(blogId);
            return "Blog deleted successfully by user";
        }

        return "You are not authorized to delete this blog";
    }

    public List<BlogPost> getBlogbyTitle(String title)
    {
        return blogPostRepository.findByTitleContainingIgnoreCase(title);
    }


}
