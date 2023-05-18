package imi.jazzberry.server.controller;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import imi.jazzberry.server.config.JwtConfig;
import imi.jazzberry.server.dto.UserDetailsDto;
import imi.jazzberry.server.exception.MissingAuthTokenException;
import imi.jazzberry.server.model.Role;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {

    private final UserService userService;

    private final JwtConfig jwtConfig;

    @Autowired
    public AuthController(UserService userService, JwtConfig jwtConfig) {
        this.userService = userService;
        this.jwtConfig = jwtConfig;
    }

    @GetMapping(path="claims")
    @SecurityRequirement(name = "bearerAuth")
    public UserDetailsDto extractClaimsFromJwt(HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if(authorizationHeader == null || ! authorizationHeader.startsWith("Bearer "))
            throw new MissingAuthTokenException("Refresh token is missing.");

        String accessToken = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256(jwtConfig.getSecret().getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(accessToken);
        String username = decodedJWT.getSubject();

        User user = userService.getUserByUsername(username);

        return new UserDetailsDto(user);
    }

    /**
     * Proxy API used just for testing purposes
     * */
    @PostMapping(path="login")
    public void login(String username,
                      String password,
                      HttpServletResponse response) throws IOException {
        response.sendRedirect(String.format("/login?username=%s&password=%s", username, password));

    }


    @GetMapping(path="token/refresh")
    @SecurityRequirement(name = "bearerAuth")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if(authorizationHeader == null || ! authorizationHeader.startsWith("Bearer "))
            throw new MissingAuthTokenException("Refresh token is missing.");
        else
        {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256(jwtConfig.getSecret().getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userService.getUserByUsername(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getAccessTokenDuration()))
                        .withClaim("roles", user.getRoles().stream().
                                map(Role::getRoleName)
                                .collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String,String> tokens = new HashMap<>();

                tokens.put("access_token",access_token);
                tokens.put("refresh_token",refresh_token);

                response.setContentType(APPLICATION_JSON_VALUE);

                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }
            catch (Exception exception)
            {
                response.setHeader("error", exception.getMessage());
                response.setStatus(UNAUTHORIZED.value());

                Map<String,String> error = new HashMap<>();

                error.put("error_message", exception.getMessage());

                response.setContentType(APPLICATION_JSON_VALUE);

                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
    }
}
