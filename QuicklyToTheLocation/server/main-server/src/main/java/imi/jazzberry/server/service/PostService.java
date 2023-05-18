package imi.jazzberry.server.service;

import imi.jazzberry.server.dto.CreatePostDto;
import imi.jazzberry.server.dto.UpdatePostDto;
import imi.jazzberry.server.enums.NotificationEnum;
import imi.jazzberry.server.model.*;
import imi.jazzberry.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final DislikeRepository dislikeRepository;
    private final LocationRepository locationRepository;
    private final CommentaryRepository commentaryRepository;
    private final CommentarySecondLevelRepository commentarySecondLevelRepository;
    private final FollowingRepository followingRepository;
    private final NotificationRepository notificationRepository;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    @Autowired
    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            LikeRepository likeRepository,
            DislikeRepository dislikeRepository,
            LocationRepository locationRepository,
            CommentaryRepository commentaryRepository,
            CommentarySecondLevelRepository commentarySecondLevelRepository,
            FollowingRepository followingRepository,
            NotificationRepository notificationRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.dislikeRepository = dislikeRepository;
        this.locationRepository = locationRepository;
        this.commentaryRepository = commentaryRepository;
        this.commentarySecondLevelRepository = commentarySecondLevelRepository;
        this.followingRepository = followingRepository;
        this.notificationRepository = notificationRepository;
    }

    public Post getPost(long postId) {
        return postRepository.findPostById(postId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByParameters(Long locationId, String startDate, String endDate, long userId) {
        if(locationId == null) {
            if(userId == -1) {
                if(startDate != null && endDate != null)
                    return postRepository.findPostsByStartDateAndEndDate(
                            LocalDate.parse(startDate,formatter),
                            LocalDate.parse(endDate,formatter));

                if(startDate != null)
                    return postRepository.findPostsByStartDate(LocalDate.parse(startDate,formatter));

                if(endDate != null)
                    return postRepository.findPostsByEndDate(LocalDate.parse(endDate,formatter));

                return postRepository.findAll();
            } else {
                if(startDate != null && endDate != null)
                    return postRepository.findPostsByStartDateAndEndDateAndUserId(
                            LocalDate.parse(startDate,formatter),
                            LocalDate.parse(endDate,formatter),
                            userId);

                if(startDate != null)
                    return postRepository.findPostsByStartDateAndUserId(
                            LocalDate.parse(startDate,formatter),
                            userId);

                if(endDate != null)
                    return postRepository.findPostsByEndDateAndUserId(
                            LocalDate.parse(endDate,formatter),
                            userId);

                return postRepository.findPostsByUserId(userId);
            }
        }

        // Location id is not null

        if(userId == -1) {
            if(startDate != null && endDate != null)
                return postRepository.findPostsByLocationIdAndStartDateAndEndDate(
                        locationId,
                        LocalDate.parse(startDate,formatter),
                        LocalDate.parse(endDate,formatter));

            if(startDate != null)
                return postRepository.findPostsByLocationIdAndStartDate(
                        locationId,
                        LocalDate.parse(startDate,formatter));

            if(endDate != null)
                return postRepository.findPostsByLocationIdAndEndDate(
                        locationId,
                        LocalDate.parse(endDate,formatter));

            return postRepository.findPostsByLocationId(locationId);
        }

        // User id is not null

        if(startDate != null && endDate != null)
            return postRepository.findPostsByParameters(
                    locationId,
                    LocalDate.parse(startDate,formatter),
                    LocalDate.parse(endDate,formatter),
                    userId);

        if(startDate != null)
            return postRepository.findPostsByLocationIdAndStartDateAndUserId(
                    locationId,
                    LocalDate.parse(startDate,formatter),
                    userId);

        if(endDate != null)
            return postRepository.findPostsByLocationIdAndEndDateAndUserId(
                    locationId,
                    LocalDate.parse(endDate,formatter),
                    userId);

        return postRepository.findPostsByLocationIdAndUserId(
                locationId,
                userId);
    }

    public Post createPost(CreatePostDto createPostDto, long id) {

        User user = userRepository.findUserById(id);

        if(user == null)
            return null;

        Integer postCount = user.getPosts();
        if(postCount == null)
            postCount = 0;

        postCount++;

        Optional<Location> optionalLocation = Optional.ofNullable(locationRepository.findByOsmIdAndOsmType(createPostDto.getOsmId(),createPostDto.getOsmType()));

        if(optionalLocation.isEmpty())
        {
            Location location = new Location(createPostDto.getOsmId(),createPostDto.getOsmType(),createPostDto.getName(),createPostDto.getX(),createPostDto.getY());

            locationRepository.save(location);

            user.setPosts(postCount);

            userRepository.save(user);

            Post post = new Post(
                    createPostDto.getDescription(),
                    LocalDate.now(),
                    createPostDto.getCreatedPictureDate(),
                    location.getId(),
                    id
            );

            return postRepository.save(post);
        }

        user.setPosts(postCount);

        userRepository.save(user);

        Post post = new Post(
                createPostDto.getDescription(),
                LocalDate.now(),
                createPostDto.getCreatedPictureDate(),
                optionalLocation.get().getId(),
                id
        );

        return postRepository.save(post);
    }

    public void likePost(long postId,long userId) {
        Optional<Like> optionalLike = Optional.ofNullable(likeRepository.findByUserIdAndPostId(userId,postId));
        Like like = new Like(userId,postId);
        Post post = postRepository.getReferenceById(postId);

        if(optionalLike.isEmpty())
        {
            likeRepository.save(like);
            post.setLikes(post.getLikes()+1);
            postRepository.save(post);

            User user = userRepository.findUserById(post.getUserId());

            List<Post> posts = postRepository.findPostsByUserId(post.getUserId());

            // TODO possible unnecessary sum since current count can be incremented
            int sumLikes = 0;
            int sumDislikes = 0;

            for (Post p:posts
            ) {
                sumLikes += p.getLikes();
                sumDislikes += p.getDislikes();
            }

            user.setLikeCounter(sumLikes);
            user.setDislikeCounter(sumDislikes);

            userRepository.save(user);

            Notification notification = new Notification(
                    NotificationEnum.LIKE,
                    LocalDateTime.now(),
                    post.getUserId(),
                    userId,
                    postId,
                    false);

            notificationRepository.save(notification);

            return;
        }

        likeRepository.delete(optionalLike.get());
        post.setLikes(post.getLikes()-1);
        postRepository.save(post);

        User user = userRepository.findUserById(post.getUserId());

        List<Post> posts = postRepository.findPostsByUserId(post.getUserId());

        // TODO possible unnecessary sum since current count can be incremented
        int sumLikes = 0;
        int sumDislikes = 0;

        for (Post p:posts
        ) {
            sumLikes += p.getLikes();
            sumDislikes += p.getDislikes();
        }

        user.setLikeCounter(sumLikes);
        user.setDislikeCounter(sumDislikes);

        userRepository.save(user);
    }

    public void dislikePost(long postId, long userId) {
        Optional<Dislike> optionalDislike = Optional.ofNullable(dislikeRepository.findByUserIdAndPostId(userId,postId));
        Dislike dislikes = new Dislike(userId,postId);
        Post post = postRepository.getReferenceById(postId);

        if(optionalDislike.isEmpty())
        {
            dislikeRepository.save(dislikes);
            post.setDislikes(post.getDislikes()+1);
            postRepository.save(post);

            User user = userRepository.findUserById(post.getUserId());

            List<Post> posts = postRepository.findPostsByUserId(post.getUserId());

            // TODO possible unnecessary sum since current count can be incremented
            int sumLikes = 0;
            int sumDislikes = 0;

            for (Post p:posts
            ) {
                sumLikes += p.getLikes();
                sumDislikes += p.getDislikes();
            }

            user.setLikeCounter(sumLikes);
            user.setDislikeCounter(sumDislikes);

            userRepository.save(user);

            Notification notification = new Notification(
                    NotificationEnum.DISLIKE,
                    LocalDateTime.now(),
                    post.getUserId(),
                    userId,
                    postId,
                    false);

            notificationRepository.save(notification);

            return;
        }

        dislikeRepository.delete(optionalDislike.get());
        post.setDislikes(post.getDislikes()-1);
        postRepository.save(post);


        User user = userRepository.findUserById(post.getUserId());

        List<Post> posts = postRepository.findPostsByUserId(post.getUserId());

        // TODO possible unnecessary sum since current count can be incremented
        int sumLikes = 0;
        int sumDislikes = 0;

        for (Post p:posts
        ) {
            sumLikes += p.getLikes();
            sumDislikes += p.getDislikes();
        }

        user.setLikeCounter(sumLikes);
        user.setDislikeCounter(sumDislikes);

        userRepository.save(user);
    }

    public boolean isLiked(Long postId, Long userId) {
        return likeRepository.isLiked(postId, userId);
    }

    public boolean isDisliked(Long postId, Long userId) {
        return dislikeRepository.isDisliked(postId, userId);
    }

    public List<Like> getLikesForPost(long postId) {
        return likeRepository.findByPostId(postId);
    }

    public List<Dislike> getDislikesForPost(long postId) {
        return dislikeRepository.getDislikesByPostId(postId);
    }

    public void deletePost(long postId) {
        Optional<Post> optionalPost = Optional.ofNullable(postRepository.findPostById(postId));

        commentarySecondLevelRepository.deleteByPostId(postId);
        commentaryRepository.deleteByPostId(postId);

        optionalPost.ifPresent(postRepository::delete);
    }

    public void updatePost(UpdatePostDto updatePostDto) {
        Post post = postRepository.findPostById(updatePostDto.getPostId());

        if(updatePostDto.getCreatedPictureDate() != null && updatePostDto.getDescription() != null){
            post.setDescription(updatePostDto.getDescription());
            post.setCreatedPictureDate(updatePostDto.getCreatedPictureDate());
        }
        else if(updatePostDto.getCreatedPictureDate() == null){
            post.setDescription(updatePostDto.getDescription());
        }
        else {
            post.setCreatedPictureDate(updatePostDto.getCreatedPictureDate());
        }

        postRepository.save(post);
    }

    public List<Post> feed(String username, int pageNumber, int pageSize) {

        List<Following> followings = followingRepository.findFollows(username);

        List<Post> postsForFeed = new ArrayList<>();
        List<Post> posts = new ArrayList<>();

        int start = pageSize * pageNumber - pageSize;

        if(pageNumber == 1)
            start = 0;

        for (Following f:followings) {
            User user = userRepository.findUserByUsername(f.getUserToFollow());

            posts.addAll(postRepository.findPostsByUserId(user.getId()));
        }

        posts.sort(Comparator.comparing(Post::getPostDate).reversed());

        pageSize = Math.min(pageSize * pageNumber, posts.size());

        for (int i = start; i < pageSize; i++) {
            postsForFeed.add(posts.get(i));
        }

        return postsForFeed;
    }
}
