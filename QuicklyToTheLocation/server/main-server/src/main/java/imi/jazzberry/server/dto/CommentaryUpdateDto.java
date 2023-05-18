package imi.jazzberry.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentaryUpdateDto {
    private long commentaryId;
    private String content;
}