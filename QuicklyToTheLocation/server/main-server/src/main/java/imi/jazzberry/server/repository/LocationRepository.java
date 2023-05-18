package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location,Long> {
    @Query(value = "select l from Location l where (:x1 < l.x and l.x < :x2) and (:y1 < l.y and l.y < :y2)")
    List<Location> findLocationBetweenXY(Double x1, Double x2, Double y1, Double y2);

    @Query(value = "select l from Location l where l.id=:locationId")
    Location findLocationByLocationId(long locationId);

    @Query(value = "select l from Location l where l.osmId=:osmId and l.osmType=:osmType")
    Location findByOsmIdAndOsmType(long osmId, String osmType);
    
    @Query(value = "select l from Location l where l.id in (:ids)")
    List<Location> findLocationByLocationIds(@Param("ids") List<Long> ids);
}
