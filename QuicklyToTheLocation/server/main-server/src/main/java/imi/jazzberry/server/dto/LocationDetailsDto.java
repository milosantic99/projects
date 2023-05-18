package imi.jazzberry.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocationDetailsDto {
    private long id;
    private long osmId;
    private String osmType;

    public LocationDetailsDto(long id, long osmId, String osmType){
        this.id = id;
        this.osmId = osmId;
        this.osmType = osmType;
    }
}
