package imi.jazzberry.chat.controller;

import com.sun.jdi.InternalException;
import imi.jazzberry.chat.config.WebSocketEventListener;
import imi.jazzberry.chat.controller.dto.OnlineUserDto;
import imi.jazzberry.chat.controller.dto.SubscribeAddressDto;
import imi.jazzberry.chat.exception.MemberDoesNotExistException;
import imi.jazzberry.chat.exception.WrongChatroomIdException;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.service.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path="ws/users")
public class MemberController {

    private final WebSocketEventListener webSocketEventListener;
    private final MessageService messageService;
    private final MemberService memberService;
    private final JwtService jwtService;
    private final ChatroomService chatroomService;
    private final NotificationService notificationService;

    @Autowired
    public MemberController(
            WebSocketEventListener webSocketEventListener,
            MessageService messageService,
            MemberService memberService,
            JwtService jwtService,
            ChatroomService chatroomService, NotificationService notificationService) {
        this.webSocketEventListener = webSocketEventListener;
        this.messageService = messageService;
        this.memberService = memberService;
        this.jwtService = jwtService;
        this.chatroomService = chatroomService;
        this.notificationService = notificationService;
    }

    @GetMapping(path = "invite")
    @SecurityRequirement(name = "bearerAuth")
    public SubscribeAddressDto getInvitationAddress(HttpServletRequest request) {
        // Check JWT & extract claims
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        var claims = jwtService.extractJwtClaimsFromHeader(authorizationHeader);
        Long userId = ((Number) claims.get("id")).longValue();
        String username =  (String) claims.get("username");

        var member = memberService.findMemberById(userId, false)
                .orElseGet(
                        () -> Member.builder()
                                .id(userId)
                                .name(username)
                                .subscribeAddress(UUID.randomUUID().toString())
                                .build());

        String subAddr = memberService.save(member).map(Member::getSubscribeAddress).orElse("");
        return new SubscribeAddressDto(userId, subAddr);
    }

    @PostMapping(path = "{otherUserId}/invite/{chatroomId}")
    @SecurityRequirement(name = "bearerAuth")
    public void inviteToChatroom(
            @PathVariable Long otherUserId,
            @PathVariable Long chatroomId,
            HttpServletRequest request) {
        // Check JWT & extract claims
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        var claims = jwtService.extractJwtClaimsFromHeader(authorizationHeader);
        Long userId = ((Number) claims.get("id")).longValue();
        String username =  (String) claims.get("username");

        // check if entities exist and if they do store them in local vars
        Chatroom chatroom  = chatroomService.findById(chatroomId, true).orElse(null);

        var sender = memberService.findMemberById(userId, true).orElse(null);
        var recipient = memberService.findMemberById(otherUserId, true).orElse(null);

        notificationService.sendChatroomInvitation(chatroomId, sender, recipient);
        // TODO store invitation in the database in case the user is offline
    }

    @GetMapping("{currentUserId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<OnlineUserDto>> getOnlineAcquaintances(@PathVariable Long memberId) {
        List<OnlineUserDto> usersWithStatus = new ArrayList<>();

        List<OnlineUserDto> offlineUsers = memberService.findAcquaintancesOfMember(memberId)
                .stream().map(OnlineUserDto::new)
                .toList();

        offlineUsers.stream();
                //.peek(u -> u.setStatus(ActivityStatus.OFFLINE))
                //.collect(Collectors.toList());

        try {
            Set<OnlineUserDto> onUsersSet = webSocketEventListener.getOnlineUsers();
            if(onUsersSet == null)
                usersWithStatus.addAll(offlineUsers);
            else {
                List<OnlineUserDto> onlineUsers = new ArrayList<>(onUsersSet);
                onlineUsers.forEach(oUsr -> {
                    long count = 0;// TODO messageService.countNewMessagesFromOnlineUser(currentUserId, oUsr.getUserId());
                    oUsr.setNumOfNewMessages(count);
                    //oUsr.setStatus(ActivityStatus.ONLINE);
                });
                usersWithStatus.addAll(onlineUsers);

                offlineUsers.forEach(offUsr -> {
                    onlineUsers.stream()
                            .map(OnlineUserDto::getUsername)
                            .toList().stream()
                                .filter(u -> u.equals(offUsr.getUsername()))
                                .map(ignore -> usersWithStatus.add(offUsr));
                });
            }
        } catch(Exception ex) {
            throw new InternalException("Cannot get the number of online users");
        }

        return ResponseEntity.ok(usersWithStatus);
    }
}