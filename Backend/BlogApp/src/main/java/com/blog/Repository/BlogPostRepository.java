package com.blog.Repository;

import com.blog.Model.BlogPost;
import com.blog.Model.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable; // ✅ Correct import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {


    int countByUser(User user);

    @Query("SELECT b FROM BlogPost b WHERE b.user = :user ORDER BY b.createdAt DESC")
    List<BlogPost> findTopByUserOrderByCreatedAtDesc(@Param("user") User user, Pageable pageable);

    // ✅ Helper method to call the above with limit
    default List<BlogPost> findTopByUserOrderByCreatedAtDesc(User user, int limit) {
        return findTopByUserOrderByCreatedAtDesc(user, PageRequest.of(0, limit));
    }

    @Query("SELECT SUM(SIZE(b.likes)) FROM BlogPost b WHERE b.user.id = :userId")
    Integer countTotalLikesByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(SIZE(b.comments)) FROM BlogPost b WHERE b.user.id = :userId")
    Integer countTotalCommentsByUserId(@Param("userId") Long userId);

     List<BlogPost> findByUser(User user);

    List<BlogPost> findByTitleContainingIgnoreCase(String title);


    @Query("SELECT COUNT(b) FROM BlogPost b WHERE b.user.id = :userId")
    int countByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM BlogPost b " +
            "LEFT JOIN FETCH b.likes " +
            "LEFT JOIN FETCH b.comments " +
            "WHERE b.id = :id")
    Optional<BlogPost> findByIdWithLikesAndComments(@Param("id") Long id);

    @Query("SELECT DISTINCT b FROM BlogPost b " +
            "LEFT JOIN FETCH b.likes " +
            "LEFT JOIN FETCH b.comments")
    List<BlogPost> findAllWithLikesAndComments();
}
