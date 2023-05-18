package imi.jazzberry.chat.model.aggregation;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import imi.jazzberry.chat.model.aggregation.idclass.MessageRecipientIdClass;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.model.message.DeliveryReceipt;
import imi.jazzberry.chat.model.message.Message;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "messages_recipients")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(MessageRecipientIdClass.class)
public class MessageRecipient  {
    @Id
    @ManyToOne
    @JsonManagedReference
    private Message message;

    @Id
    @ManyToOne
    @JsonManagedReference
    private Member recipient;

    @Column(name = "delivery_receipt")
    @Enumerated(EnumType.STRING)
    private DeliveryReceipt deliveryReceipt;

    @Column(name = "delivery_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate = new Date();

    @Override
    public String toString() {
        return "MessageRecipient{" +
                "message=" + message +
                ", recipient=" + recipient +
                ", deliveryReceipt=" + deliveryReceipt +
                ", deliveryDate=" + deliveryDate +
                '}';
    }
}
