package com.blog.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Community_Posts")
@PrimaryKeyJoinColumn(name = "id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CommunityPost extends Post {

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;
}

