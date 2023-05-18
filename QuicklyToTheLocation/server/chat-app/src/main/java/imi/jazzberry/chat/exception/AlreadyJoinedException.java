package imi.jazzberry.chat.exception;


import imi.jazzberry.chat.model.chatroom.Chatroom;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class AlreadyJoinedException extends RuntimeException {
    private final Chatroom chatroom;
    public AlreadyJoinedException(String message, @NotNull Chatroom chatroom) {
        super(message);
        this.chatroom = chatroom;
    }
}
