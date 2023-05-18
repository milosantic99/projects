package imi.jazzberry.server.controller;

import imi.jazzberry.server.enums.ResponseEntityEnum;
import imi.jazzberry.server.service.FollowingService;
import imi.jazzberry.server.service.JwtService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path = "api/v1/followings")
public class FollowingController {

    private final FollowingService followingService;
    private final JwtService jwtService;

    @Autowired
    public FollowingController(FollowingService followingService, JwtService jwtService){
        this.followingService = followingService;
        this.jwtService = jwtService;
    }

    @GetMapping("{username}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getUserFollowings(@PathVariable("username") String username){
        return new ResponseEntity<>(followingService.getUserFollowings(username),HttpStatus.OK);
    }

    @GetMapping("userFollows")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getFollows(HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String userWhoFollows =  ((String) claims.get("username"));

        return new ResponseEntity<>(followingService.getFollows(userWhoFollows),HttpStatus.OK);
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getAllFollowings(){
        return new ResponseEntity<>(followingService.getAllFollowings(),HttpStatus.OK);
    }

    @PostMapping("follow")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> followUser(@RequestParam String userToFollow, HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String userWhoFollows =  ((String) claims.get("username"));

        ResponseEntityEnum responseEntityEnum = followingService.followUser(userToFollow, userWhoFollows);

        if(responseEntityEnum == ResponseEntityEnum.FOLLOWING)
            return new ResponseEntity<>("Already following.", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Follow.", HttpStatus.OK);
    }

    @PostMapping("unfollow")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> unfollowUser(@RequestParam String userToUnfollow, HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String userWhoUnfollows =  ((String) claims.get("username"));

        ResponseEntityEnum responseEntityEnum = followingService.unfollowUser(userToUnfollow,userWhoUnfollows);

        if(responseEntityEnum == ResponseEntityEnum.FOLLOWING)
            return new ResponseEntity<>("Not following.", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Unfollow.", HttpStatus.OK);
    }

    @GetMapping("check/{followeeUsername}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> checkIfUserIsFollowed(@PathVariable String followeeUsername, HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String loggedUserUsername =  ((String) claims.get("username"));

        boolean isFollowing = followingService.isFollowing(loggedUserUsername, followeeUsername);

        return new ResponseEntity<>(isFollowing, HttpStatus.OK);
    }
}
