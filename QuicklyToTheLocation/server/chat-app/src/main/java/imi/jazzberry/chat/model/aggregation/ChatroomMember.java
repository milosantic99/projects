package imi.jazzberry.chat.model.aggregation;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import imi.jazzberry.chat.model.aggregation.idclass.ChatroomMemberIdClass;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.member.Member;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "chatrooms_members")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ChatroomMemberIdClass.class)
@ToString
public class ChatroomMember {
    @Id
    @ManyToOne
    @JsonManagedReference
    private Chatroom chatroom;

    @Id
    @ManyToOne
    @JsonManagedReference
    private Member member;

    @Column(name = "join_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date joinDate = new Date();
}
