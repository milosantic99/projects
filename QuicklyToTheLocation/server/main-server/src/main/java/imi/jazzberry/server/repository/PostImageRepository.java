package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.PostImage;
import imi.jazzberry.server.model.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage,Long> {
    PostImage findByName(String name);
    List<PostImage> findAllByPostId(long postId);
}
