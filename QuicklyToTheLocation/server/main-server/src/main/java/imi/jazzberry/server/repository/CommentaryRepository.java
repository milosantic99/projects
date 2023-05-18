package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Commentary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CommentaryRepository extends JpaRepository<Commentary,Long> {
    List<Commentary> findByPostId(long postId);

    @Query(value = "select c from commentaries c where c.id =:commentaryId")
    Commentary findByCommentaryId(long commentaryId);

    @Modifying
    @Query(value = "delete from commentaries c where c.postId=:postId")
    void deleteByPostId(long postId);

    @Modifying
    @Transactional
    @Query(value = "delete from commentaries c where c.id=:commentaryId")
    void deleteByCommentaryId(long commentaryId);

    @Query(value = "select c from commentaries c where c.userId=:id")
    List<Commentary> findByUserId(long id);

    @Query(value = "delete from commentaries c where c.userId=:id")
    void deleteByUserId(long id);
}
