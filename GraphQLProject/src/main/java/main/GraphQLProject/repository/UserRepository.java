package main.GraphQLProject.repository;

import main.GraphQLProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<main.GraphQLProject.model.User, Long> {
    User getUserByEmail(String email);
    User getUserById(long id);
}
