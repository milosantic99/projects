package imi.jazzberry.server.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@ToString
@Table(name = "app_users")
@Entity
public class User {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )

    private long id;
    private String username;
    private String email;
    private String password;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    @ManyToMany(fetch = EAGER)
    private Collection<Role> roles;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true)
    private Integer followers;

    @Column(nullable = true)
    private Integer posts;

    @Column(nullable = true)
    private Integer reputation;

    @Column(name = "image_id", nullable = true)
    private Long imageId;
    
    private int likeCounter;
    private int dislikeCounter;

    public User(){

    }

    public User(String username, String email, String firstName, String lastName, String password) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public User(long id, String username, String email, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

    public User( long id, String username, String email, String firstName, String lastName, String password) {
        this(id, username, email, firstName, lastName);
        this.password = password;
    }

    public User(String username,
                String email,
                String firstName,
                String lastName,
                String password,
                Collection<Role> roles,
                Integer reputation,
                Integer followers,
                Integer posts,
                int likeCounter,
                int dislikeCounter
    ) {
        this(username, email, firstName, lastName,password);
        this.roles = roles;
        this.reputation = reputation;
        this.followers = followers;
        this.posts = posts;
        this.likeCounter = likeCounter;
        this.dislikeCounter = dislikeCounter;
    }

}
