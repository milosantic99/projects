package imi.jazzberry.server.exception;

public class MissingAuthTokenException extends RuntimeException {

    public MissingAuthTokenException(String message) {
        super(message);
    }
}
