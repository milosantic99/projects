package imi.jazzberry.chat.service;

import imi.jazzberry.chat.controller.dto.NotificationDto;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.chatroom.ChatroomType;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.model.message.Message;
import imi.jazzberry.chat.service.dto.ChatroomInvitationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class NotificationService {

    private final SimpMessageSendingOperations sendingOps;
    private final SimpMessagingTemplate sendingTemplate;

    @Value("${endpoints.inbox.private.prefix}")
    private String privateInboxPrefix;

    @Value("${endpoints.inbox.private.postfix}")
    private String privateInboxPostfix;

    @Value("${endpoints.inbox.group.prefix}")
    private String groupInboxPrefix;

    @Value("${endpoints.inbox.group.postfix}")
    private String groupInboxPostfix;

    @Value("${endpoints.inbox.invite}")
    private String inviteSuffix;

    @Autowired
    public NotificationService(
            SimpMessageSendingOperations sendingOps,
            SimpMessagingTemplate sendingTemplate) {
        this.sendingOps = sendingOps;
        this.sendingTemplate = sendingTemplate;
    }

    public void sendNotificationToUser(Long to, Message message) {
        NotificationDto notif = new NotificationDto(message);
        sendingOps.convertAndSendToUser( "" + to, privateInboxPostfix, notif);
    }

    public void broadcastNotification(@NotNull Chatroom chatroom, Message message) {
        NotificationDto notif = new NotificationDto(message);
        var subAddress = chatroom.getSubscribeAddress();

        sendingTemplate.convertAndSend(groupInboxPrefix + "/" + subAddress  + groupInboxPostfix, notif);
    }

    public void sendChatroomInvitation(@NotNull Long chatroomId, @NotNull Member sender, @NotNull Member recipient) {
        ChatroomInvitationDto chatroomInvitation = new ChatroomInvitationDto(
                sender.getId(),
                sender.getName(),
                chatroomId);

        String url = String.format("%s/%s/%s/%s",
                privateInboxPrefix, recipient.getSubscribeAddress(), privateInboxPostfix, inviteSuffix);
        sendingTemplate.convertAndSend(url, chatroomInvitation);
    }
}
