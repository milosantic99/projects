package imi.jazzberry.chat.controller.dto;

import com.sun.jdi.InternalException;
import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinChatroomDto {
    private Long memberId;
    private Long chatroomId;
    private String subscribeAddress;

    public JoinChatroomDto(@NotNull Long memberId, @NotNull Chatroom chatroom) {
        this.chatroomId = chatroom.getId();
        this.subscribeAddress = chatroom.getSubscribeAddress();
        this.memberId = memberId;
    }
}
