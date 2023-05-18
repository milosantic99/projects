package imi.jazzberry.server.service;

import imi.jazzberry.server.model.Location;
import imi.jazzberry.server.model.Post;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.repository.LocationRepository;
import imi.jazzberry.server.repository.PostRepository;
import imi.jazzberry.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    @Autowired
    public LocationService(LocationRepository locationRepository, UserRepository userRepository, PostRepository postRepository){
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    public List<Location> filterLocation(Double x1, Double x2, Double y1, Double y2, String username) {

        List<Location> locations;
        List<Long> idsOfUserLocations = new ArrayList<>();

        if(username != null){
            User user = userRepository.findUserByUsername(username);
            List<Post> posts = postRepository.findPostsByUserId(user.getId());

            posts.forEach(post -> idsOfUserLocations.add(post.getLocationId()));
        }

        if(x1 == null && y1 == null && x2 == null && y2 == null)
            locations = locationRepository.findLocationByLocationIds(idsOfUserLocations);
        else
            locations = locationRepository.findLocationBetweenXY(x1, x2, y1, y2).stream()
                    .filter(location -> username == null || idsOfUserLocations.contains(location.getId()))
                    .toList();

        return locations;
    }

    public Location getLocationById(long locationId) {
        return locationRepository.findLocationByLocationId(locationId);
    }

    public Location getLocationByOsmIdAndOsmType(long osmId, String osmType) {
        return locationRepository.findByOsmIdAndOsmType(osmId, osmType);
    }
}
