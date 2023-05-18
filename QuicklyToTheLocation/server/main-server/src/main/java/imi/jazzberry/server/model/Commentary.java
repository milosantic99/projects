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
@Entity(name="commentaries")
@NoArgsConstructor
public class Commentary {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private long postId;
    private long userId;
    private String content;

    public Commentary(long postId, long userId, String content) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }
}
