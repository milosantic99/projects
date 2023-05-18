package imi.jazzberry.chat.repository;

import imi.jazzberry.chat.model.chatroom.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
    @Query("SELECT DISTINCT c1 FROM Chatroom c1"
            + " JOIN c1.chatroomMembers m1"
        + " WHERE c1.type = 'PRIVATE'"
            + " AND m1.member.id = :senderId"
            + " AND EXISTS ("
                + " SELECT DISTINCT m2"
                + " FROM Chatroom c2 "
                + " JOIN c2.chatroomMembers m2"
                + " WHERE c1.id = c2.id AND m2.member.id = :recipientId AND m1.member.id <> m2.member.id)")
    Optional<Chatroom> findChatroomBySenderIdAndRecipientId(Long senderId, Long recipientId);
}