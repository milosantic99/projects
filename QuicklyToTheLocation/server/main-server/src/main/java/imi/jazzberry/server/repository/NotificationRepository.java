package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(long userId);

    @Query(value = "select n from Notification n where n.seen=false and n.userId=:userId")
    List<Notification> findByNotSeen(long userId);

    @Query(value = "select n from Notification n where n.userId=:userId and n.datetime<=:currentDate and n.seen=false")
    List<Notification> findByUserIdAndDate(long userId, LocalDateTime currentDate);
}
