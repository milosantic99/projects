package imi.jazzberry.server.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.transaction.Transactional;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@ToString
@Table(name = "locations")
@Entity
@Transactional
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;

    private long osmId;
    private String osmType;
    private String name;
    private double x;
    private double y;

    public Location(long osmId, String osmType, String name, double x, double y) {
        this.osmId = osmId;
        this.osmType = osmType;
        this.name = name;
        this.x = x;
        this.y = y;
    }
}
