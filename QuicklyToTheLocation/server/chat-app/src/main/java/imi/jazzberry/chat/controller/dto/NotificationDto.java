package imi.jazzberry.chat.controller.dto;

import imi.jazzberry.chat.model.message.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private Long chatroomId;
    private Long messageId;
    private String content;
    private SenderDto sender;
    private Date creationDate;
    private Long replyToMessageId;

    public NotificationDto(Message message) {
        var chatroom = message.getChatroom();
        if(chatroom == null)
            this.chatroomId = null;
        else
            this.chatroomId = chatroom.getId();

        this.messageId = message.getId();
        this.content = message.getContent();
        this.sender = new SenderDto(message.getSender());
        this.creationDate = message.getCreationDate();

        var replyTo = message.getReplyTo();
        if(replyTo == null)
            this.replyToMessageId = null;
        else
            this.replyToMessageId = replyTo.getId();
    }
}