package imi.jazzberry.chat.repository;

import imi.jazzberry.chat.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("FROM Message m WHERE m.chatroom.id = :chatroomId")
    List<Message> findMessagesByChatroomId(Long chatroomId);

    @Query("FROM Message m WHERE m.sender.id = :senderId AND m.chatroom.id = :chatroomtId")
    List<Message> findMessagesFromSender(Long senderId, Long chatroomtId);

//    TODO: implement new message count for given user
//    @Query("SELECT COUNT(*) FROM Message m"
//        + " WHERE m.recipientId = :currentUserId"
//        + " AND m.senderId = :otherUserId AND m.status = 'RECEIVED'")
//    int countNewMessagesFromUser(String currentUserId, String otherUserId);

}