package imi.jazzberry.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CreatePostDto {

    private String description;
    private LocalDate createdPictureDate;
    private long osmId;
    private String osmType;
    private String name;
    private double x;
    private double y;
}
