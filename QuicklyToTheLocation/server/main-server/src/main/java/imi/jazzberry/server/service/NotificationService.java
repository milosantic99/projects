package imi.jazzberry.server.service;

import imi.jazzberry.server.model.Notification;
import imi.jazzberry.server.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    @Autowired
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }
    public List<Notification> getAllNotifications(long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getNewNotifications(long userId) {
        return notificationRepository.findByNotSeen(userId);
    }

    public void notificationSeen(long userId) {
        LocalDateTime currentDate = LocalDateTime.now();
        List<Notification> notifications = notificationRepository.findByUserIdAndDate(userId,currentDate);

        for (Notification n:notifications) {
            n.setSeen(true);
        }

        notificationRepository.saveAll(notifications);
    }
}
