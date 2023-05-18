package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.CommentarySecondLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CommentarySecondLevelRepository extends JpaRepository<CommentarySecondLevel, Long> {
    @Query(value = "select s from commentariesSecondLevel s where s.postId=:postId and s.commentaryId=:commentaryId")
    List<CommentarySecondLevel> findByPostIdAndCommentaryId(long postId, long commentaryId);

    @Query(value = "select s from commentariesSecondLevel s where s.id =:commentaryId")
    CommentarySecondLevel findBySecondCommentaryId(long commentaryId);

    @Query(value = "select s from commentariesSecondLevel s where s.postId =:postId")
    List<CommentarySecondLevel> findByPostId(long postId);

    @Modifying
    @Query(value = "delete from commentariesSecondLevel c where c.postId=:postId")
    void deleteByPostId(long postId);

    @Modifying
    @Transactional
    @Query(value = "delete from commentariesSecondLevel c where c.commentaryId=:commentaryId")
    void deleteByCommentaryId(long commentaryId);

    List<CommentarySecondLevel> findByUserId(long id);

    @Query(value = "delete from commentariesSecondLevel c where c.userId=:id")
    void deleteByUserId(long id);
}
