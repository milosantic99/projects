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
@Entity(name="commentariesSecondLevel")
@NoArgsConstructor
public class CommentarySecondLevel {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private long postId;
    private long commentaryId;
    private long userId;
    private String content;

    public CommentarySecondLevel(long postId, long commentaryId, String content, long userId) {
        this.postId = postId;
        this.commentaryId = commentaryId;
        this.content = content;
        this.userId = userId;
    }
}
