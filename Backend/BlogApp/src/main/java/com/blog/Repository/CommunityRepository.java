package com.blog.Repository;

import com.blog.Model.Community;
import com.blog.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByOwner(User owner);
    List<Community> findByMembersContaining(User member);
    List<Community> findByNameContainingIgnoreCase(String keyword);
}
