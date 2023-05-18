package imi.jazzberry.chat.model.member;

import com.fasterxml.jackson.annotation.JsonBackReference;
import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import imi.jazzberry.chat.model.aggregation.MessageRecipient;

import imi.jazzberry.chat.model.message.Message;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "members")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    private Long id;

    @Version
    @JoinColumn(name = "entity_version")
    private Integer entityVersion;

    @Column
    private String name;

    @Column(name = "subscribe_address")
    private String subscribeAddress = UUID.randomUUID().toString();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "recipient",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonBackReference
    private Set<MessageRecipient> messageRecipients = new HashSet<>();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "member",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonBackReference
    private Set<ChatroomMember> chatroomMembers = new HashSet<>();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "sender",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonBackReference
    private Set<Message> messages = new HashSet<>();

    public void addMessageRecipient(MessageRecipient messageRecipient) {
        messageRecipients.add(messageRecipient);
        messageRecipient.setRecipient(this);
    }

    public void removeMessageRecipient(MessageRecipient messageRecipient) {
        messageRecipients.remove(messageRecipient);
        messageRecipient.setRecipient(null);
    }

    public void addChatroomMember(ChatroomMember chatroomMember) {
        chatroomMembers.add(chatroomMember);
        chatroomMember.setMember(this);
    }

    public void removeChatroomMember(ChatroomMember chatroomMember) {
        chatroomMembers.remove(chatroomMember);
        chatroomMember.setMember(null);
    }

    public void addMessage(Message message) {
        messages.add(message);
        message.setSender(this);
    }

    public void removeMessage(Message message) {
        messages.remove(message);
        message.setSender(null);
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
