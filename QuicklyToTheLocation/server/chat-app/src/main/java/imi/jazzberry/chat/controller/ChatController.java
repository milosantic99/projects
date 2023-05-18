package imi.jazzberry.chat.controller;

import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.controller.dto.MessageDTO;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.model.message.Message;
import imi.jazzberry.chat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@Controller
public class ChatController {
    private final NotificationService notificationService;
    private final MessageService messageService;
    private final ChatroomService chatroomService;
    private final MemberService memberService;
    private final JwtService jwtService;

    @Autowired
    public ChatController(ChatroomService chatroomService,
                          MessageService messageService,
                          NotificationService notificationService,
                          MemberService memberService,
                          JwtService jwtService) {
        this.chatroomService = chatroomService;
        this.messageService = messageService;
        this.notificationService = notificationService;
        this.memberService = memberService;
        this.jwtService = jwtService;
    }

    @MessageMapping("/chat/{chatroomId}")
    public void sendMessage(
            @DestinationVariable("chatroomId") long chatroomId,
            @Payload MessageDTO messageDto,
            @Header("access_token") String accessToken) {
        // Check JWT & extract claims
        var claims = jwtService.extractJwtClaims(accessToken);
        Long userId = ((Number) claims.get("id")).longValue();
        String username =  (String) claims.get("username");

        // check if entities exist and if they do store them in local vars
        Chatroom chatroom = chatroomService.findById(chatroomId, true).orElse(null);
        Member sender = memberService.findMemberById(userId, true).orElse(null);

        Message message = messageDto.toMessage(sender, chatroom);
        message = messageService.save(message);

        notificationService.broadcastNotification(chatroom, message);
    }
}
