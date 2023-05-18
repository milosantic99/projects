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
@Entity(name="followings")
@NoArgsConstructor
public class Following {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private String userToFollow;
    private String userWhoFollows;

    public Following(String userToFollow, String userWhoFollows){
        this.userToFollow = userToFollow;
        this.userWhoFollows = userWhoFollows;
    }
}
