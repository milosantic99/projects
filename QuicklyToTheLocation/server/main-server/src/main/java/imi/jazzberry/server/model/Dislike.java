package imi.jazzberry.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@ToString
@Entity(name="dislikes")
@NoArgsConstructor
public class Dislike {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private long userId;
    private long postId;

    public Dislike(long userId, long postId) {
        this.userId = userId;
        this.postId = postId;
    }
}
