package com.blog.Dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BlogPostDto {
    private Long id;
    private String title;
    private String content;
    private String image;
    private Long writerId;
    private String writerName;
    private LocalDateTime createdAt;
    private List<Long> commentIds;
    private List<Long> likeIds;
    private String writerAvatar; // New field

}
