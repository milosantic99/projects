package imi.jazzberry.server.model;

import imi.jazzberry.server.enums.NotificationEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@ToString
@Table(name = "notifications")
@Entity
@Transactional
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private NotificationEnum type;
    private LocalDateTime datetime;
    private long userId;
    private long initiatorId;
    @Column(nullable = true)
    private Long postId;
    private boolean seen;

    public Notification(
            NotificationEnum type,
            LocalDateTime datetime,
            long userId,
            long initiatorId,
            Long postId,
            boolean seen){
        this.type = type;
        this.datetime = datetime;
        this.userId = userId;
        this.initiatorId = initiatorId;
        this.postId = postId;
        this.seen = seen;
    }
}
