package imi.jazzberry.server.config;

import imi.jazzberry.server.exception.ApiError;
import imi.jazzberry.server.exception.MissingAuthTokenException;
import imi.jazzberry.server.exception.ResponseEntityBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ExceptionConfiguration extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MissingAuthTokenException.class)
    public ResponseEntity<Object> handleMissingAuthTokenErrors(MissingAuthTokenException exception) {
        List<String> details = new ArrayList<String>();
        details.add(exception.getMessage());

        ApiError err = new ApiError(
                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED,
                exception.getMessage(),
                details);

        return ResponseEntityBuilder.build(err);
    }
}