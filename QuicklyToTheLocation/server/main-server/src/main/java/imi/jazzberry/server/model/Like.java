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
@Entity(name="likes")
@NoArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;

    private long userId;

    private long postId;

    public Like(long userId, long postId) {
        this.userId = userId;
        this.postId = postId;
    }
}
