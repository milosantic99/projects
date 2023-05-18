package imi.jazzberry.chat.repository;

import imi.jazzberry.chat.model.aggregation.MessageRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface MessageRecipientRepository extends JpaRepository<MessageRecipient, Long> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value =
            "UPDATE MessageRecipient"
        + " SET deliveryReceipt = 'DELIVERED'"
        + " WHERE recipient.id = :recipientId"
        + " AND deliveryReceipt <> 'DELIVERED' OR deliveryReceipt is null")
    void updateDeliveryReceiptsByRecipientId(long recipientId);
}