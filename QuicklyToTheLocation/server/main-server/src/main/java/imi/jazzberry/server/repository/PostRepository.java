package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    Post findPostById(Long postId);
    List<Post> findPostsByLocationId(long locationId);
    List<Post> findPostsByUserId(long userId);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.postDate >= :startDate")
    List<Post> findPostsByLocationIdAndStartDate(long locationId, LocalDate startDate);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.postDate <= :endDate")
    List<Post> findPostsByLocationIdAndEndDate(long locationId, LocalDate endDate);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.postDate between :startDate and :endDate")
    List<Post> findPostsByLocationIdAndStartDateAndEndDate(long locationId, LocalDate startDate, LocalDate endDate);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.userId = :userId")
    List<Post> findPostsByLocationIdAndUserId(long locationId, long userId);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.userId = :userId and p.postDate between :startDate and :endDate")
    List<Post> findPostsByParameters(long locationId, LocalDate startDate, LocalDate endDate, long userId);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.postDate >= :startDate and p.userId = :userId")
    List<Post> findPostsByLocationIdAndStartDateAndUserId(long locationId, LocalDate startDate, long userId);

    @Query(value = "select p from Post p where p.locationId = :locationId and p.postDate <= :endDate and p.userId = :userId")
    List<Post> findPostsByLocationIdAndEndDateAndUserId(long locationId, LocalDate endDate, long userId);

    @Query(value = "select p from Post p where p.postDate >= :startDate")
    List<Post> findPostsByStartDate(LocalDate startDate);

    @Query(value = "select p from Post p where p.postDate between :startDate and :endDate")
    List<Post> findPostsByStartDateAndEndDate(LocalDate startDate, LocalDate endDate);

    @Query(value = "select p from Post p where p.userId = :userId and p.postDate between :startDate and :endDate")
    List<Post> findPostsByStartDateAndEndDateAndUserId(LocalDate startDate, LocalDate endDate, long userId);

    @Query(value = "select p from Post p where p.postDate <= :endDate")
    List<Post> findPostsByEndDate(LocalDate endDate);

    @Query(value = "select p from Post p where p.postDate <= :endDate and p.userId = :userId")
    List<Post> findPostsByEndDateAndUserId(LocalDate endDate, long userId);

    @Query(value = "select p from Post p where p.postDate >= :startDate and p.userId = :userId")
    List<Post> findPostsByStartDateAndUserId(LocalDate startDate, long userId);

    @Query("delete from Post p where p.userId=:id")
    void deleteByUserId(long id);
}
