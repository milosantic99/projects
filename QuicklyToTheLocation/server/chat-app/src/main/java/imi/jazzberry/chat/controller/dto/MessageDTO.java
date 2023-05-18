package imi.jazzberry.chat.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.model.message.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageDTO {
    private Long id;

    private Long replyToId;

    @JsonProperty(required = true)
    private String content;

    public Message toMessage(Member sender, Chatroom chatroom) {

        Message replyTo = null;

       if( replyToId != null) {
           replyTo = new Message();
           replyTo.setId(replyToId);
       }

        var msg = Message.builder()
               .id(id)
                .sender(sender)
                .chatroom(chatroom)
                .replyTo(replyTo)
                .content(content)
                .creationDate(new Timestamp(new Date().getTime()))
                .build();

        if(sender != null) {
            if (sender.getMessages() == null)
                sender.setMessages(new HashSet<>());
            sender.addMessage(msg);
        }

        return msg;
    }
}
