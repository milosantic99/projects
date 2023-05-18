package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    @Query(value = "select l from likes l where l.userId=:userId and l.postId=:postId")
    Like findByUserIdAndPostId(long userId, long postId);
    @Query(value = "select l from likes l where l.postId=:postId")
    List<Like> findByPostId(long postId);

    @Query(value = "select l from likes l where l.userId=:id")
    List<Like> findByUserId(long id);

    @Query(value = "delete from likes l where l.userId=:id")
    void deleteByUserId(long id);

    @Query(value = "SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM likes l" +
            " WHERE l.postId = :postId AND l.userId = :userId")
    boolean isLiked(Long postId, Long userId);
}
