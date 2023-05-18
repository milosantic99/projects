package imi.jazzberry.chat.model.chatroom;

import com.fasterxml.jackson.annotation.JsonBackReference;
import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "chatrooms")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chatroom {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Version
    @JoinColumn(name = "entity_version")
    private Integer entityVersion;

    @Column(name = "creation_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate = new Date();

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ChatroomType type;

    @Setter(AccessLevel.NONE)
    @Column(name = "subscribe_address")
    private String subscribeAddress = UUID.randomUUID().toString();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "chatroom",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonBackReference
    private Set<ChatroomMember> chatroomMembers = new HashSet<>();

    public void addChatroomMember(ChatroomMember chatroomMember) {
        chatroomMembers.add(chatroomMember);
        chatroomMember.setChatroom(this);
    }

    public void removeChatroomMember(ChatroomMember chatroomMember) {
        chatroomMembers.add(chatroomMember);
        chatroomMember.setChatroom(null);
    }

    @Override
    public String toString() {
        return "Chatroom{" +
                "id=" + id +
                ", creationDate=" + creationDate +
                '}';
    }
}