package com.blog.Controller;

import com.blog.Model.Community;
import com.blog.Model.User;
import com.blog.Service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/communities")
@RequiredArgsConstructor
public class CommunityController {

    @Autowired
    private final CommunityService communityService;

    
    @PostMapping
    public ResponseEntity<String> createCommunity(@RequestBody Community community,
                                                  @RequestAttribute("user") User user) {
        String response = communityService.createCommunity(community, user);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCommunity(@PathVariable Long id,
                                                  @RequestAttribute("user") User user) {
        Community community = new Community();
        community.setId(id); // assumes community is loaded in service
        community.setOwner(user);
        String result = communityService.deleteCommunity(community, user);
        return ResponseEntity.ok(result);
    }


    @PostMapping("/{id}/join")
    public ResponseEntity<String> joinCommunity(@PathVariable Long id,
                                                @RequestAttribute("user") User user) {

        Community community = new Community();
        community.setId(id);

        String result = communityService.joinCommunity(community, user);
        return ResponseEntity.ok(result);
    }



    @PostMapping("/{id}/leave")
    public ResponseEntity<String> leaveCommunity(@PathVariable Long id,
                                                 @RequestAttribute("user") User user) {
        Community community = new Community();
        community.setId(id);
        String result = communityService.leaveCommunity(community, user);
        return ResponseEntity.ok(result);
    }


    @GetMapping
    public List<Community> getAllCommunities() {
        return communityService.findAllCommunities();
    }


    @GetMapping("/joined")
    public List<Community> getJoinedCommunities(@RequestAttribute("user") User user) {
        return communityService.findCommunitiesByUser(user);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getCommunityMembers(@PathVariable Long id,
                                                 @RequestAttribute("user") User user) {
        Community community = new Community();
        community.setId(id);
        return ResponseEntity.ok(communityService.getMembersInCommunity(community, user));
    }


    @GetMapping("/search")
    public List<Community> searchCommunities(@RequestParam String name) {
        return communityService.searchCommunitiesByName(name);
    }
}
