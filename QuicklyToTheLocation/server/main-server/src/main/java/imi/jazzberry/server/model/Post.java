package imi.jazzberry.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import static javax.persistence.GenerationType.AUTO;


@Getter
@Setter
@ToString
@Table(name = "posts")
@Entity
@Transactional
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;

    private String description;
    private int likes;
    private int dislikes;
    private int commentaryCounter;
    private LocalDate postDate;
    private LocalDate createdPictureDate;
    private long locationId;
    private long userId;

    public Post(String description, LocalDate postDate, LocalDate createdPictureDate, long locationId, long usernameId)
    {
        this.description = description;
        this.postDate = postDate;
        this.createdPictureDate = createdPictureDate;
        this.locationId = locationId;
        this.userId = usernameId;
    }

    public Post(String description,
                int likes,
                int dislikes,
                LocalDate postDate,
                LocalDate createdPictureDate,
                long locationId,
                long usernameId)
    {
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.postDate = postDate;
        this.createdPictureDate = createdPictureDate;
        this.locationId = locationId;
        this.userId = usernameId;
    }
}