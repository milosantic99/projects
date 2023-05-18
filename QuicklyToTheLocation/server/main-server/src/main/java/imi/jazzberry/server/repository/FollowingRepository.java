package imi.jazzberry.server.repository;

import imi.jazzberry.server.model.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following,Long> {
    @Query(value = "Select f from followings f where f.userToFollow =:username")
    List<Following> findAllByUserToFollow(String username);

    @Query(value = "Select f from followings f where f.userToFollow=:userToFollow and f.userWhoFollows=:userWhoFollows")
    Following findUsers(String userToFollow, String userWhoFollows);

    @Query(value = "Select f from followings f where f.userWhoFollows =:userWhoFollows")
    List<Following> findFollows(String userWhoFollows);

    @Query(value = "select f from followings f where f.userToFollow=:username or f.userWhoFollows=:username")
    List<Following> findByAnyUser(String username);

    @Query(value = "delete from followings f where f.userWhoFollows=:username or f.userToFollow=:username")
    void deleteByUsername(String username);

    @Query(value = "SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM followings f" +
            " WHERE f.userWhoFollows = :follower AND f.userToFollow = :followee")
    boolean isFollowing(String follower, String followee);
}
