package imi.jazzberry.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserPasswordUpdateDto {
    private String oldPassword;
    private String newPassword;
}
