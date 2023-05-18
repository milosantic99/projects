package imi.jazzberry.server.controller;

import imi.jazzberry.server.dto.NotificationDto;
import imi.jazzberry.server.model.Notification;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.service.JwtService;
import imi.jazzberry.server.service.NotificationService;
import imi.jazzberry.server.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path = "api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public NotificationController(NotificationService notificationService,
                                  JwtService jwtService,
                                  UserService userService){
        this.notificationService = notificationService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getAllNotifications(HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId =  ((Number) claims.get("id")).longValue();

        List<Notification> notifications = notificationService.getAllNotifications(userId);

        List<NotificationDto> notificationDtos = new ArrayList<>();

        notifications.forEach(notification -> {
            User user = userService.getUserByUserId(notification.getInitiatorId());
            if(user == null) {
                System.out.printf("Notification %s has invalid initiator id.%n", notification);
            } else {
                notificationDtos.add(new NotificationDto(notification, user.getUsername()));
            }
        });

        return new ResponseEntity<>(notificationDtos, HttpStatus.OK);
    }

    @GetMapping(path = "new")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getNewNotifications(HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId =  ((Number) claims.get("id")).longValue();

        List<Notification> notifications = notificationService.getNewNotifications(userId);

        List<NotificationDto> notificationDtos = new ArrayList<>();

        notifications.forEach(notification -> {
            User user = userService.getUserByUserId(notification.getInitiatorId());
            if(user == null) {
                System.out.printf("Notification %s has invalid initiator id.%n", notification);
            } else {
                notificationDtos.add(new NotificationDto(notification, user.getUsername()));
            }
        });

        return new ResponseEntity<>(notificationDtos,HttpStatus.OK);
    }

    @PatchMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> notificationSeen(HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId =  ((Number) claims.get("id")).longValue();

        notificationService.notificationSeen(userId);
        return new ResponseEntity<>("Notifications seen.", HttpStatus.OK);
    }
}
