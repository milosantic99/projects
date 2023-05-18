package imi.jazzberry.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UpdatePostDto {
    private long postId;
    private String description;
    private LocalDate createdPictureDate;
}