package imi.jazzberry.server.dto;

import imi.jazzberry.server.model.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class PostDetailsDto {

    private long id;
    private String description;
    private int likes;
    private int dislikes;
    private int commentaryCounter;
    private LocalDate postDate;
    private LocalDate createdPictureDate;
    private long locationId;
    private long userId;
    private boolean liked = false;
    private boolean disliked = false;

    public PostDetailsDto(long id,
                          String description,
                          int likes,
                          int dislikes,
                          int commentaryCounter,
                          LocalDate postDate,
                          LocalDate createdPictureDate,
                          long locationId,
                          long userId,
                          boolean liked,
                          boolean disliked) {
        this.id = id;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.commentaryCounter = commentaryCounter;
        this.postDate = postDate;
        this.createdPictureDate = createdPictureDate;
        this.locationId = locationId;
        this.userId = userId;
        this.liked = liked;
        this.disliked = disliked;
    }

    public PostDetailsDto(Post post, boolean liked, boolean disliked) {
        this.id = post.getId();
        this.description = post.getDescription();
        this.likes = post.getLikes();
        this.dislikes = post.getDislikes();
        this.commentaryCounter = post.getCommentaryCounter();
        this.postDate = post.getPostDate();
        this.createdPictureDate = post.getCreatedPictureDate();
        this.locationId = post.getLocationId();
        this.userId = post.getUserId();
        this.liked = liked;
        this.disliked = disliked;
    }
}
