package imi.jazzberry.chat.config;

import imi.jazzberry.chat.exception.ApiError;
import imi.jazzberry.chat.exception.MissingAuthTokenException;
import imi.jazzberry.chat.exception.ResponseEntityBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ExceptionConfiguration extends ResponseEntityExceptionHandler {

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<Object> handleErrors(HttpClientErrorException exception) {
        List<String> details = new ArrayList<String>();
        details.add(exception.getMessage());

        ApiError err = new ApiError(
                LocalDateTime.now(),
                exception.getStatusCode(),
                exception.getMessage(),
                details);

        return ResponseEntityBuilder.build(err);
    }
}
