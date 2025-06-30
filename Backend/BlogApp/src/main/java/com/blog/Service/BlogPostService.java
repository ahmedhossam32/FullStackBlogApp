package com.blog.Service;

import com.blog.Dto.BlogPostDto;
import com.blog.Model.BlogPost;
import com.blog.Model.Post;
import com.blog.Model.User;
import com.blog.Repository.BlogPostRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    public void createBlogPost(BlogPost blogPost, User user) {
        blogPost.setUser(user);
        blogPost.setImageUrl(blogPost.getImageUrl()); // make sure it's passed
        blogPostRepository.save(blogPost);
    }



    public boolean isPostLikedByUser(Long postId, User user) {
        Post post = blogPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));

        return post.getLikes().stream()
                .anyMatch(like -> like.getUser().getId().equals(user.getId()));
    }


    public List<BlogPostDto> getAllBlogs() {
        List<BlogPost> blogs = blogPostRepository.findAll(); // you can use a custom fetch method here if needed
        return blogs.stream().map(this::convertToDto).toList();
    }

    public BlogPostDto getBlogById(Long id) {
        return blogPostRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    public List<BlogPost> getBlogsByUser(User user) {
        return blogPostRepository.findByUser(user); // you can enhance this with custom fetch joins if needed
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

    public List<BlogPost> getBlogbyTitle(String title) {
        return blogPostRepository.findByTitleContainingIgnoreCase(title);
    }

    public int countUserBlogs(User user) {
        return blogPostRepository.countByUser(user);
    }

    public int countLikesOnUserBlogs(User user) {
        return blogPostRepository.countTotalLikesByUserId(user.getId());
    }

    public int countCommentsOnUserBlogs(User user) {
        return blogPostRepository.countTotalCommentsByUserId(user.getId());
    }

    public List<BlogPost> getRecentBlogsByUser(User user, int limit) {
        return blogPostRepository.findTopByUserOrderByCreatedAtDesc(user, limit);
    }



    public BlogPostDto convertToDto(BlogPost blogPost) {
        BlogPostDto dto = new BlogPostDto();
        dto.setId(blogPost.getId());
        dto.setTitle(blogPost.getTitle());
        dto.setContent(blogPost.getContent());
        dto.setCreatedAt(blogPost.getCreatedAt());
        dto.setWriterAvatar(blogPost.getUser().getProfileImage());

        dto.setImage(blogPost.getImageUrl()); // ✅ correct method

        dto.setWriterName(blogPost.getUser().getName());
        dto.setWriterId(blogPost.getUser().getId());

        // ✅ Map comment IDs
        List<Long> commentIds = blogPost.getComments().stream()
                .map(comment -> comment.getId())
                .toList();
        dto.setCommentIds(commentIds);

        // ✅ Map like IDs
        List<Long> likeIds = blogPost.getLikes().stream()
                .map(like -> like.getId())
                .toList();
        dto.setLikeIds(likeIds);

        return dto;
    }



}
