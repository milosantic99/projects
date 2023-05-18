package imi.jazzberry.chat.config;

import imi.jazzberry.chat.controller.dto.OnlineUserDto;
import imi.jazzberry.chat.model.member.ActivityStatus;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.service.JwtService;
import imi.jazzberry.chat.service.MemberService;
import imi.jazzberry.chat.service.RestClient;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.*;

@Component
@Data
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;
    private final JwtService jwtService;
    private final MemberService memberService;
    private Set<OnlineUserDto> onlineUsers;

    @Autowired
    public WebSocketEventListener(
            SimpMessageSendingOperations messagingTemplate,
            JwtService jwtService,
            MemberService memberService) {
        this.messagingTemplate = messagingTemplate;
        this.jwtService = jwtService;
        this.memberService = memberService;
    }

    private Map<String, List<String>> extractNativeHeaders(AbstractSubProtocolEvent event) {
        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
        @SuppressWarnings("rawtypes")
        GenericMessage connectHeader = (GenericMessage) stompAccessor
                .getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);

        @SuppressWarnings("unchecked")
        var nativeHeaders = (Map<String, List<String>>) connectHeader.getHeaders()
                .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);

        return nativeHeaders;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {

        // Extract data
        var nativeHeaders = extractNativeHeaders(event);
        String accessToken = nativeHeaders.get("access_token").get(0);
        System.out.println(accessToken);

        var response = jwtService.extractJwtClaims(accessToken);

        Long id =  (Long) response.get("id");
        String username = (String) response.get("username");

        System.out.printf("id: %d, username: %s%n", id, username);
        // TODO: fix feature for activity status
//        if(this.onlineUsers == null){
//            this.onlineUsers = new HashSet<>();
//        }
//        Optional<Member> member = memberService.findById(Long.valueOf(id));
//        if(member.isPresent()){
//            OnlineUserDto onlineUser = new OnlineUserDto(member.get());
//            this.onlineUsers.add(onlineUser);
//        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        TODO
//        var nativeHeaders = extractNativeHeaders(event);
//        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = stompAccessor.getSessionId();
//
//        OnlineUserDto offlineUser = this.onlineUsers
//                .stream()
//                .filter((a) -> a.getSessionId().equals(sessionId))
//                .toList().get(0);
//        this.onlineUsers.remove(offlineUser);
    }

}
