package imi.jazzberry.chat.exception;

public class MemberDoesNotExistException extends RuntimeException {
    public MemberDoesNotExistException(String message) {
        super(message);
    }
}
