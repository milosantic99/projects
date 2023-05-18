package imi.jazzberry.server.service;

import imi.jazzberry.server.enums.NotificationEnum;
import imi.jazzberry.server.enums.ResponseEntityEnum;
import imi.jazzberry.server.model.Following;
import imi.jazzberry.server.model.Notification;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.repository.FollowingRepository;
import imi.jazzberry.server.repository.NotificationRepository;
import imi.jazzberry.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FollowingService {
    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Autowired
    public FollowingService(FollowingRepository followingRepository,
                            UserRepository userRepository,
                            NotificationRepository notificationRepository){
        this.followingRepository = followingRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    public ResponseEntityEnum followUser(String userToFollow, String userWhoFollows) {
        Following following = new Following(userToFollow,userWhoFollows);

        if(followingRepository.findUsers(userToFollow,userWhoFollows) != null)
            return ResponseEntityEnum.FOLLOWING;

        User user = userRepository.findUserByUsername(userToFollow);

        Integer followers = user.getFollowers();
        if(followers == null)
            followers = 0;
        user.setFollowers(followers+1);

        userRepository.save(user);

        followingRepository.save(following);

        Notification notification = new Notification(
                NotificationEnum.FOLLOW,
                LocalDateTime.now(),
                userRepository.findUserByUsername(userToFollow).getId(),
                userRepository.findUserByUsername(userWhoFollows).getId(),
                -1L,
                false);

        notificationRepository.save(notification);

        return ResponseEntityEnum.OK;
    }

    public ResponseEntityEnum unfollowUser(String userToFollow, String userWhoFollows) {
        Optional<Following> optionalFollowing = Optional.ofNullable(followingRepository.findUsers(userToFollow,userWhoFollows));

        if(followingRepository.findUsers(userToFollow,userWhoFollows) == null)
            return ResponseEntityEnum.NOT_FOLLOWING;

        User user = userRepository.findUserByUsername(userToFollow);

        Integer followers = user.getFollowers();
        if(followers == null)
            followers = 0;
        user.setFollowers(followers-1);

        userRepository.save(user);

        optionalFollowing.ifPresent(followingRepository::delete);

        return ResponseEntityEnum.OK;
    }

    public List<Following> getAllFollowings() {
        return followingRepository.findAll();
    }

    public List<Following> getUserFollowings(String username) {
        return followingRepository.findAllByUserToFollow(username);
    }

    public List<Following> getFollows(String userWhoFollows) {
        return followingRepository.findFollows(userWhoFollows);
    }

    public boolean isFollowing(String follower, String followee) {
        return followingRepository.isFollowing(follower, followee);
    }
}
