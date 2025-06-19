package com.blog.Service;

import com.blog.Model.Community;
import com.blog.Model.User;
import com.blog.Repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    @Autowired
    private final CommunityRepository communityRepository;

    public String createCommunity(Community community, User user) {
        community.setOwner(user);
        community.setMembers(List.of(user)); // auto-join the owner
        communityRepository.save(community);
        return "Community created and owner joined successfully";
    }


    public String deleteCommunity(Community community, User user) {
        if (!community.getOwner().getId().equals(user.getId())) {
            return "You cannot delete this community";
        }

        communityRepository.delete(community);
        return "Community deleted successfully";
    }


    public String joinCommunity(Community community, User user) {
        Community fullCommunity = communityRepository.findById(community.getId()).orElse(null);
        if (fullCommunity == null) {
            return "Community not found";
        }


        if (fullCommunity.getMembers().contains(user)) {
            return "You are already a member of this community";
        }

        fullCommunity.getMembers().add(user);
        communityRepository.save(fullCommunity);
        return "Joined community successfully";
    }



    public String leaveCommunity(Community community, User user) {
        System.out.println("💡 Attempting to leave community with ID: " + community.getId());


        Community fullCommunity = communityRepository.findById(community.getId()).orElse(null);
        if (fullCommunity == null) {
            return "Community not found";
        }


        if (!fullCommunity.getMembers().contains(user)) {
            return "You are not a member of this community";
        }

        // Prevent owner from leaving
        if (fullCommunity.getOwner().getId().equals(user.getId())) {

            return "Owner cannot leave the community. Transfer or delete it first.";
        }

        fullCommunity.getMembers().remove(user);
        communityRepository.save(fullCommunity);

        return "Left community successfully";
    }



    public List<Community> findAllCommunities() {
        return communityRepository.findAll();
    }

    public List<Community> findCommunitiesByUser(User user) {
        return communityRepository.findByMembersContaining(user);
    }


    public List<User> getMembersInCommunity(Community community, User requester) {
        Community fullCommunity = communityRepository.findById(community.getId())
                .orElseThrow(() -> new RuntimeException("Community not found"));

        if (!fullCommunity.getOwner().getId().equals(requester.getId())) {
            throw new RuntimeException("Only the owner can view community members");
        }

        return new ArrayList<>(fullCommunity.getMembers());
    }


    public List<Community> searchCommunitiesByName(String keyword) {
        return communityRepository.findByNameContainingIgnoreCase(keyword);
    }
}
