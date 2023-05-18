package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Dislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DislikeRepository extends JpaRepository<Dislike,Long> {
    @Query(value = "select d from dislikes d where d.postId=:postId")
    List<Dislike> getDislikesByPostId(long postId);
    @Query(value = "select d from dislikes d where d.postId=:postId and d.userId=:userId")
    Dislike findByUserIdAndPostId(long userId, long postId);

    @Query(value = "select d from dislikes d where d.userId=:id")
    List<Dislike> findByUserId(long id);

    @Query(value = "delete from dislikes d where d.userId=:id")
    void deleteByUserId(long id);

    @Query(value = "SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM dislikes d" +
            " WHERE d.postId = :postId AND d.userId = :userId")
    boolean isDisliked(Long postId, Long userId);
}
