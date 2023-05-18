package imi.jazzberry.chat.controller;

import imi.jazzberry.chat.exception.MemberDoesNotExistException;
import imi.jazzberry.chat.exception.WrongChatroomIdException;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.message.Message;
import imi.jazzberry.chat.service.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path="ws/messages")
public class MessageController {

    private final MessageService messageService;
    private final ChatroomService chatroomService;
    private final MessageRecipientService messageRecipientService;
    private final MemberService memberService;
    private final JwtService jwtService;

    @Autowired
    public MessageController(MessageService messageService,
                             ChatroomService chatroomService,
                             MessageRecipientService messageRecipientService,
                             MemberService memberService,
                             JwtService jwtService) {
        this.messageService = messageService;
        this.chatroomService = chatroomService;
        this.messageRecipientService = messageRecipientService;
        this.memberService = memberService;
        this.jwtService = jwtService;
    }

    @GetMapping("{chatroomId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<Message>> getChatroomMessages (
            @PathVariable Long chatroomId,
            Boolean excludeRequester,
            HttpServletRequest request) {
        // Check JWT & extract claims
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        var claims = jwtService.extractJwtClaimsFromHeader(authorizationHeader);
        Long userId = ((Number) claims.get("id")).longValue();

        // check if entities exist and if they do store them in local vars
        Chatroom chatroom = chatroomService.findById(chatroomId, true).orElse(null);

        memberService.findMemberById(userId, true); // TODO change find to exists

        List<Message> messages = messageService.findMessagesByChatroomId(chatroomId);

        if(excludeRequester == null || !excludeRequester)
            return ResponseEntity.ok(messages);

        return ResponseEntity.ok(
                    messages.stream()
                        .filter(message ->
                                Optional.of(message.getSender())
                                    .map(sender -> ! userId.equals(sender.getId()))
                                .orElse(false))
                        .toList());
    }
}
