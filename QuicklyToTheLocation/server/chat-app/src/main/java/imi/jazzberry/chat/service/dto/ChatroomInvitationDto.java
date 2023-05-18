package imi.jazzberry.chat.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatroomInvitationDto {
    private Long senderId;
    private String senderName;
    private Long chatroomId;
}
