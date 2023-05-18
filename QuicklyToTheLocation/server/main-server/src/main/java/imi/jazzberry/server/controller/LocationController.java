package imi.jazzberry.server.controller;

import imi.jazzberry.server.dto.LocationDetailsDto;
import imi.jazzberry.server.model.Location;
import imi.jazzberry.server.service.LocationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/locations")
public class LocationController {

    private final LocationService locationService;
    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getAllLocations()
    {
        List<Location> locations = locationService.getAllLocations();

        List<LocationDetailsDto> locationDetailsDtos = new ArrayList<>();

        for (Location l:locations) {
            LocationDetailsDto locationDetailsDto = new LocationDetailsDto(
                    l.getId(),
                    l.getOsmId(),
                    l.getOsmType()
            );

            locationDetailsDtos.add(locationDetailsDto);
        }

        return new ResponseEntity<>(locationDetailsDtos,HttpStatus.OK);
    }

    @GetMapping("filter")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> filterLocation(@RequestParam(required = false) Double x1,
                                            @RequestParam(required = false) Double y1,
                                            @RequestParam(required = false) Double x2,
                                            @RequestParam(required = false) Double y2,
                                            @RequestParam(required = false) String username)
    {
        List<Location> locations = locationService.filterLocation(x1, x2, y1, y2,username);

        List<LocationDetailsDto> locationDetailsDtos = new ArrayList<>();

        for (Location l:locations) {
            LocationDetailsDto locationDetailsDto = new LocationDetailsDto(
                    l.getId(),
                    l.getOsmId(),
                    l.getOsmType()
            );

            locationDetailsDtos.add(locationDetailsDto);
        }

        return new ResponseEntity<>(locationDetailsDtos, HttpStatus.OK);
    }

    @GetMapping(path = "{locationId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getLocationById(@PathVariable long locationId){
        Location location = locationService.getLocationById(locationId);

        if(location == null)
            return new ResponseEntity<>("Location not found.", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @GetMapping(path = "{osmId}/{osmType}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getLocationById(@PathVariable long osmId, @PathVariable String osmType){
        Location location = locationService.getLocationByOsmIdAndOsmType(osmId,osmType);

        if(location == null)
            return new ResponseEntity<>("Location not found.", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(location, HttpStatus.OK);
    }
}
