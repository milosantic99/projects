package imi.jazzberry.server.model;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user_images")
public class UserImage {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private String type;
    @Column(name = "image", nullable = false, length = 100000)
    private byte[] image;
}
