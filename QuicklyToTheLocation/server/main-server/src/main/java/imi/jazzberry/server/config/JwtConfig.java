package imi.jazzberry.server.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class JwtConfig {
    @Value("${jwt.secret}") String secret;
    @Value("${jwt.access-token.duration}") long accessTokenDuration;
    @Value("${jwt.refresh-token.duration}") long refreshTokenDuration;
}
