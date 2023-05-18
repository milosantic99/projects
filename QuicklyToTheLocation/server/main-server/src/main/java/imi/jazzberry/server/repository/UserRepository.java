package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findUserByEmail(String email);
    
    User findUserByUsername(String username);

    User findUserById(long id);
}
