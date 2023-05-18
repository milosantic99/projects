package imi.jazzberry.chat.exception;

public class MissingAuthTokenException extends RuntimeException {
    public MissingAuthTokenException(String message) {
        super(message);
    }
}
