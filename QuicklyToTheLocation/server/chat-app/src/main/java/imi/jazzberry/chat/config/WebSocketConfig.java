package imi.jazzberry.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${endpoints.inbox.private.prefix}")
    private String privateInboxPrefix;

    @Value("${endpoints.inbox.group.prefix}")
    private String groupInboxPrefix;

    @Value("${endpoints.application-destination.prefix}")
    private String applicationDestinationPrefix;

    @Value("${endpoints.stomp.prefix}")
    private String stompPrefix;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker(privateInboxPrefix, groupInboxPrefix);
        config.setApplicationDestinationPrefixes(applicationDestinationPrefix);
        config.setUserDestinationPrefix(privateInboxPrefix);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint(stompPrefix + "/**")
                .withSockJS();
    }
}
