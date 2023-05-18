package imi.jazzberry.chat.controller.dto;

import imi.jazzberry.chat.model.member.ActivityStatus;
import imi.jazzberry.chat.model.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OnlineUserDto {
    private Long userId;
    private String sessionId;
    private String username;
    private Long numOfNewMessages;

    public OnlineUserDto(Member member) {
        userId = member.getId();
        username = member.getName();
    }

    public OnlineUserDto(Member member, String sessionId) {
        this(member);
        this.sessionId = sessionId;
    }
}