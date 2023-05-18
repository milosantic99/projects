package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage,Long> {
    UserImage findByName(String name);

    @Query(value = "select i from user_images i where i.id=:imageId")
    UserImage findByUserImageId(Long imageId);
}
