package imi.jazzberry.server.dto;

import imi.jazzberry.server.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDetailsDto {

    private long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String description;
    private Integer followers;
    private Integer posts;
    private Integer reputation;
    private int likeCounter;
    private int dislikeCounter;
    private boolean following;

    public UserDetailsDto(User user) {
        id = user.getId();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        username = user.getUsername();
        email = user.getEmail();
        description = user.getDescription();
        followers = user.getFollowers();
        posts = user.getPosts();
        reputation = user.getReputation();
        likeCounter = user.getLikeCounter();
        dislikeCounter = user.getDislikeCounter();
    }
    public UserDetailsDto(User user, boolean isFollowedByLoggedUser) {
        this(user);
        following = isFollowedByLoggedUser;
    }
}