package imi.jazzberry.chat.model.aggregation.idclass;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRecipientIdClass implements Serializable {
    private Long message;
    private Long recipient;
}
