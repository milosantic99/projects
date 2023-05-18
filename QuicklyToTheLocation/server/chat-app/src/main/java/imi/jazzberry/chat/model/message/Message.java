package imi.jazzberry.chat.model.message;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import imi.jazzberry.chat.model.aggregation.MessageRecipient;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.member.Member;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "messages")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Version
    @JoinColumn(name = "entity_version")
    private Integer entityVersion;

    @ManyToOne
    @JsonManagedReference
    private Chatroom chatroom;

    @ManyToOne
    @JsonManagedReference
    private Member sender;

    @ManyToOne
    @JoinColumn(name = "reply_to_id")
    private Message replyTo; // TODO: implement

    @Column
    private String content; // TODO: add some interface as field type

    @Column(name = "creation_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate = new Date();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "message",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonBackReference
    private Set<MessageRecipient> messageRecipients = new HashSet<>();

    public void addMessageRecipient(MessageRecipient messageRecipient) {
        messageRecipients.add(messageRecipient);
        messageRecipient.setMessage(this);
    }

    public void removeMessageRecipient(MessageRecipient messageRecipient) {
        messageRecipients.add(messageRecipient);
        messageRecipient.setMessage(null);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", chatroom=" + chatroom +
                ", sender=" + sender +
                ", replyTo=" + replyTo +
                ", content='" + content + "\'" +
                ", creationDate=" + creationDate +
                ", messageRecipients=" + messageRecipients +
                '}';
    }
}