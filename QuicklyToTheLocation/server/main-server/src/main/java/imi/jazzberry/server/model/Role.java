package imi.jazzberry.server.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@ToString
@Entity(name="roles")
public class Role{
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private String roleName;
}
