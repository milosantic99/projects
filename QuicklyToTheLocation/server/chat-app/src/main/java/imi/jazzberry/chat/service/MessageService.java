package imi.jazzberry.chat.service;

import com.sun.jdi.InternalException;
import imi.jazzberry.chat.model.message.Message;
import imi.jazzberry.chat.repository.MessageRepository;
import imi.jazzberry.chat.repository.ChatroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatroomRepository chatroomRepository;

    @Autowired
    public MessageService(
            MessageRepository messageRepository,
            ChatroomRepository chatroomRepository) {
        this.messageRepository = messageRepository;
        this.chatroomRepository = chatroomRepository;
    }

//    TODO: implement new message count for given user
//    public int countNewMessagesFromUser(String currentUserId, String otherUserId){
//        return messageRepository.countNewMessagesFromUser(currentUserId, otherUserId);
//    }

    public List<Message> findMessagesByChatroomId(Long chatroomId){
        return messageRepository.findMessagesByChatroomId(chatroomId);
    }


    public List<Message> findMessagesFromSender(Long senderId,  Long chatroomId){
        return messageRepository.findMessagesFromSender(senderId, chatroomId);
    }

    @Transactional
    public Message save(Message message) {
        if(message == null)
            throw new InternalException("Passed reference to the message parameter cannot be null");
        if(message.getChatroom() == null)
            throw new InternalException("Passed reference to chatroom of the message cannot be null");

        try{
            chatroomRepository.save(message.getChatroom());
            return messageRepository.save(message);
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw new InternalException("Cannot create new message in chatroomId " + message.getChatroom().getId());
        }
    }
}
