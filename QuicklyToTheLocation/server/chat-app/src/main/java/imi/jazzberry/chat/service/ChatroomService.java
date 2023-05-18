package imi.jazzberry.chat.service;

import com.sun.jdi.InternalException;
import imi.jazzberry.chat.exception.AlreadyJoinedException;
import imi.jazzberry.chat.exception.WrongChatroomIdException;
import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.chatroom.ChatroomType;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.repository.ChatroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;
    private final MemberService memberService;

    @Autowired
    public ChatroomService(
            ChatroomRepository chatroomRepository,
            MemberService memberService) {
        this.chatroomRepository = chatroomRepository;
        this.memberService = memberService;
    }
    public Optional<Chatroom> findChatroomBySenderIdAndRecipientId(Long senderId, Long recipientId){
        return chatroomRepository.findChatroomBySenderIdAndRecipientId(senderId, recipientId);
    }

    public List<Chatroom> findAll() {
        return chatroomRepository.findAll();
    }

    public Optional<Chatroom> findById(Long id, boolean raiseWrongIdException) {
        var chatroom =  chatroomRepository.findById(id);

        if(chatroom.isEmpty() && raiseWrongIdException)
            throw new WrongChatroomIdException(
                    String.format("Chatroom with id %d does not exist", id));

        return chatroom;
    }

    public Optional<Chatroom> createNewPrivateChatroom() {

        try{
            var chatroom = new Chatroom();
            chatroom.setType(ChatroomType.PRIVATE);

            return Optional.of(chatroomRepository.saveAndFlush(chatroom));
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw new InternalException("Cannot create new private chatroom");
        }
    }

    public Optional<Chatroom> createNewGroupChatroom() {

        try{
            var chatroom = new Chatroom();
            chatroom.setType(ChatroomType.GROUP);

            return Optional.of(chatroomRepository.save(chatroom));
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw new InternalException("Cannot create new group chatroom");
        }
    }

    public void deleteAll() {
        chatroomRepository.deleteAll();
    }

    public void deleteById(Long id) {
        chatroomRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return chatroomRepository.existsById(id);
    }
    
    @Transactional
    public Chatroom addNewMember(Long chatroomId, Long userId) {
        // check if entities exist and if they do store them in local vars
        var chatroom = findById(chatroomId, true).orElse(null);
        var member = memberService.findMemberById(userId, true).orElse(null);

        boolean alreadyJoined = chatroom.getChatroomMembers().stream()
                .anyMatch(chatroomMember -> member.equals(chatroomMember.getMember()));

        if (alreadyJoined)
            throw new AlreadyJoinedException(
                    String.format("User %s is already a member of chatroom %s", member, chatroom),
                    chatroom);

        // populate relationship variables
        var chatroomMember = new ChatroomMember();
        chatroomMember.setChatroom(chatroom);
        chatroomMember.setMember(member);

        if (member.getChatroomMembers() == null)
            member.setChatroomMembers(new HashSet<>());

        if (chatroom.getChatroomMembers() == null)
            chatroom.setChatroomMembers(new HashSet<>());

        member.addChatroomMember(chatroomMember);
        chatroom.addChatroomMember(chatroomMember);

        return chatroom;
    }
}
