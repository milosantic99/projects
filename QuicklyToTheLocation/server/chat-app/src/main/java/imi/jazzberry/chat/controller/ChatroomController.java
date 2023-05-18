package imi.jazzberry.chat.controller;

import imi.jazzberry.chat.controller.dto.JoinChatroomDto;
import imi.jazzberry.chat.controller.dto.SubscribeAddressDto;
import imi.jazzberry.chat.exception.AlreadyJoinedException;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.service.ChatroomService;
import imi.jazzberry.chat.service.JwtService;
import imi.jazzberry.chat.service.MemberService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("ws/chatrooms")
public class ChatroomController {

    private final ChatroomService chatroomService;
    private final JwtService jwtService;

    public ChatroomController(
            ChatroomService chatroomService,
            JwtService jwtService) {
        this.chatroomService = chatroomService;
        this.jwtService = jwtService;
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public List<Chatroom> getAllChatrooms() {
        return chatroomService.findAll();
    }

    @PostMapping("create/private")
    public Chatroom createPrivateChatroom() {
        return chatroomService.createNewPrivateChatroom().orElseGet(() -> null); // TODO return chatroomDto
    }

    @PostMapping("create/group")
    public Chatroom createGroupChatroom() {
        return chatroomService.createNewGroupChatroom().orElseGet(() -> null); // TODO return chatroomDto
    }

    @GetMapping("{chatroomId}/subscribe")
    @SecurityRequirement(name = "bearerAuth")
    public SubscribeAddressDto getChatroomSubscribeAddress(@PathVariable Long chatroomId, HttpServletRequest request) {
        // Check JWT & extract claims
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        var claims = jwtService.extractJwtClaimsFromHeader(authorizationHeader);
        Long userId = ((Number) claims.get("id")).longValue();

        String subscribeAddress;
        try {
            subscribeAddress = chatroomService.addNewMember(chatroomId, userId).getSubscribeAddress();
        } catch (AlreadyJoinedException e) {
            System.out.println(e.getMessage());
            subscribeAddress = e.getChatroom().getSubscribeAddress();
        }

        return new SubscribeAddressDto(userId, subscribeAddress);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    public void deleteAllChatroom() {
        chatroomService.deleteAll();
    }

    @GetMapping(path = "{id}")
    public Chatroom getChatroomById(@PathVariable("id") Long id) {
        return chatroomService.findById(id, true).orElse(null);
    }

    @DeleteMapping(path = "{id}")
    @SecurityRequirement(name = "bearerAuth")
    public void deleteChatroomById(@PathVariable("id") Long id) {
        chatroomService.deleteById(id);
    }
}
