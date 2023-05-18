package imi.jazzberry.chat.service;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Service
public class RestClient {
    private String url;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private RestTemplate rest;
    private HttpHeaders headers;
    private HttpStatus status;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private JsonParser jsonParser;

    private String response;

    public Map<String, Object> getResponseAsMap() {
        return jsonParser.parseMap(response);
    }

    public List<Object> getResponseAsList() {
        return jsonParser.parseList(response);
    }

    public RestClient() {
        this.rest = new RestTemplate();
        this.headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "*/*");
        jsonParser = JsonParserFactory.getJsonParser();
    }

    public RestClient(String url) {
        this();
        this.url = url;
    }

    private void send(String  url,
                      HttpMethod method,
                      @Nullable
                      HttpEntity<?> requestEntity,
                      Class <String> responseType,
                      Object ... uriVariables) {
        var responseEntity = rest.exchange(
                url, method, requestEntity, responseType, uriVariables);

        this.setStatus(responseEntity.getStatusCode());
        this.setResponse(responseEntity.getBody());
    }

    public void get() {
        get("");
    }

    public void get(String endpoint) {
        HttpEntity<String> requestEntity = new HttpEntity<>("", headers);
        send(url + endpoint, HttpMethod.GET, requestEntity, String.class);
    }

    public void post(String json) {
        post("", json);
    }

    public void post(String endpoint, String json) {
        HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
        send(url + endpoint, HttpMethod.POST, requestEntity, String.class);
    }

    public void put(String json) {
        put("", json);
    }

    public void put(String endpoint, String json) {
        HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
        send(url + endpoint, HttpMethod.PUT, requestEntity, String.class);
    }

    public void delete() {
        delete("");
    }

    public void delete(String endpoint) {
        HttpEntity<String> requestEntity = new HttpEntity<>("", headers);
        send(url + endpoint, HttpMethod.DELETE, requestEntity, String.class);
    }
}