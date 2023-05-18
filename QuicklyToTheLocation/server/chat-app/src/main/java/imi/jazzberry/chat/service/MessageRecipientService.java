package imi.jazzberry.chat.service;

import imi.jazzberry.chat.repository.MessageRecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageRecipientService {

    private final MessageRecipientRepository messageRecipientRepository;

    @Autowired
    public MessageRecipientService(MessageRecipientRepository messageRecipientRepository) {
        this.messageRecipientRepository = messageRecipientRepository;
    }

    public void updateDeliveryReceiptsByRecipientId(long recipientId) {
        messageRecipientRepository.updateDeliveryReceiptsByRecipientId(recipientId);
    }
}
