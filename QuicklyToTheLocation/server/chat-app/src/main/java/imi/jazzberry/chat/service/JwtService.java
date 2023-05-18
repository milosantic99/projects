package imi.jazzberry.chat.service;

import imi.jazzberry.chat.exception.MissingAuthTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class JwtService {

    private final RestClient restClient;
    @Value("${endpoints.auth-server.base-url}${endpoints.auth-server.claims.extract}")
    private String extractClaimsUrl;

    @Autowired
    public JwtService(RestClient restClient) {
        this.restClient = restClient;
    }

    public Map<String, Object> extractJwtClaims(String jwtToken) {
        restClient.getHeaders().setBearerAuth(jwtToken);
        restClient.setUrl(extractClaimsUrl);
        restClient.get();

        return restClient.getResponseAsMap();
    }

    public Map<String, Object> extractJwtClaimsFromHeader(String authorizationHeader) {
        if(authorizationHeader == null || ! authorizationHeader.startsWith("Bearer "))
            throw new MissingAuthTokenException("JWT is missing.");

        return extractJwtClaims(authorizationHeader.substring("Bearer ".length()));
    }
}
