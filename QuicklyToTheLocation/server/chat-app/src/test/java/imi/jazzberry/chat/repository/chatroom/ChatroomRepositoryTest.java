package imi.jazzberry.chat.repository.chatroom;

import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.chatroom.ChatroomType;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.repository.ChatroomRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;


import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ChatroomRepositoryTest {
    @Autowired
    private ChatroomRepository chatroomRepository;

    @Test
    public void findChatroomBySenderIdAndRecipientId() {
        var member1 = Member.builder()
                .id(3L)
                .name("3")
                .build();

        var member2 = Member.builder()
                .id(4L)
                .name("4")
                .build();

        var crMember1 = new ChatroomMember();
        var crMember2 = new ChatroomMember();

        crMember1.setMember(member1);
        crMember2.setMember(member2);

        var cr = new Chatroom();
        cr.setType(ChatroomType.PRIVATE);
        cr.addChatroomMember(crMember1);
        cr.addChatroomMember(crMember2);

        crMember1.setChatroom(cr);
        crMember2.setChatroom(cr);

        chatroomRepository.save(cr);
        var crId = chatroomRepository
                .findChatroomBySenderIdAndRecipientId(3L,4L)
                .map(Chatroom::getId).orElseGet(()->null);
        assertEquals((Long)1L, (Long)crId);
    }
}