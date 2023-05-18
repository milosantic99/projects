package imi.jazzberry.server.dto;

import imi.jazzberry.server.enums.NotificationEnum;
import imi.jazzberry.server.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private long id;
    private NotificationEnum type;
    private LocalDateTime datetime;
    private Long initiatorId;
    private String initiatorName;
    private Long postId;
    private boolean seen;

    public NotificationDto(Notification notification, String initiatorName) {
        this.id = notification.getId();
        this.type = notification.getType();
        this.datetime = notification.getDatetime();
        this.initiatorId = notification.getInitiatorId();
        this.initiatorName = initiatorName;
        this.postId = notification.getPostId();
        this.seen = notification.isSeen();
    }
}
