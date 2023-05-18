package imi.jazzberry.chat.controller.dto;

import imi.jazzberry.chat.model.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SenderDto {
    private Long id;
    private String name;

    public SenderDto(Member sender) {
        this.id = sender.getId();
        this.name = sender.getName();
    }
}
