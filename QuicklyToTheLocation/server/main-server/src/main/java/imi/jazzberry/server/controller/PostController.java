package imi.jazzberry.server.controller;

import imi.jazzberry.server.dto.CreatePostDto;
import imi.jazzberry.server.dto.PostDetailsDto;
import imi.jazzberry.server.dto.UpdatePostDto;
import imi.jazzberry.server.enums.SortOrder;
import imi.jazzberry.server.enums.SortType;
import imi.jazzberry.server.model.*;
import imi.jazzberry.server.service.*;
import imi.jazzberry.server.util.CaseInsensitiveEnumEditor;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path = "api/v1/posts")
public class PostController {
    private final PostService postService;
    private final PostImageService postImageService;
    private final UserService userService;
    private final JwtService jwtService;
    private final CommentaryService commentaryService;

    @Autowired
    public PostController(
            PostService postService,
            PostImageService postImageService,
            UserService userService,
            JwtService jwtService,
            CommentaryService commentaryService) {
        this.postService = postService;
        this.postImageService = postImageService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.commentaryService = commentaryService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(SortType.class, new CaseInsensitiveEnumEditor(SortType.class));
        binder.registerCustomEditor(SortOrder.class, new CaseInsensitiveEnumEditor(SortOrder.class));
    }

    @GetMapping(path = "{postId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getPost(@PathVariable long postId,
                                     HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String usernameFromJwt = (String) claims.get("username");

        User loggedUser = userService.getUserByUsername(usernameFromJwt);

        Post post = postService.getPost(postId);

        if (post == null)
            return new ResponseEntity<>("Post with " + postId + " does not exist.", HttpStatus.NOT_FOUND);

        boolean liked = postService.isLiked(postId, loggedUser.getId());
        boolean disliked = postService.isDisliked(postId, loggedUser.getId());

        return new ResponseEntity<>(new PostDetailsDto(post, liked, disliked), HttpStatus.OK);
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getPosts() {
        List<Post> posts = postService.getAllPosts();

        if (posts == null)
            posts = List.of();

        // TODO use DTO as return type instead of model 'Post'

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping(path = "filter")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getPostByParameters(@RequestParam(required = false) Long locationId,
                                                 @RequestParam(required = false) String startDate,
                                                 @RequestParam(required = false) String endDate,
                                                 @RequestParam(required = false) String username,
                                                 @RequestParam(required = false) SortType sortBy,
                                                 @RequestParam(required = false) SortOrder sortOrder,
                                                 HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String usernameFromJwt = (String) claims.get("username");

        User loggedUser = userService.getUserByUsername(usernameFromJwt);

        long userId = -1;
        List<Post> posts;

        if (username != null) {
            User user = userService.getUserByUsername(username);
            if(user == null)
                return new ResponseEntity<>(
                        "User with username " + username + " does not exist.",
                        HttpStatus.BAD_REQUEST);

            userId = user.getId();
        }

        if(locationId == null
        && startDate == null
        && endDate == null
        && username == null)
            return new ResponseEntity<>("You have to provide at least one filter parameter.",
                    HttpStatus.BAD_REQUEST);

        posts = postService.getPostsByParameters(locationId, startDate, endDate, userId);

        List<PostDetailsDto> postDetailsDtos = new ArrayList<>();

        for (Post p : posts) {
            List<Like> likes = postService.getLikesForPost(p.getId());
            List<Dislike> dislikes = postService.getDislikesForPost(p.getId());
            List<Commentary> commentaries = commentaryService.getCommentariesForPost(p.getId());

            boolean liked = likes.stream().anyMatch(d -> d.getUserId() == loggedUser.getId());
            boolean disliked = dislikes.stream().anyMatch(d -> d.getUserId() == loggedUser.getId());

            PostDetailsDto postDetailsDto = new PostDetailsDto(
                    p.getId(),
                    p.getDescription(),
                    likes.size(),
                    dislikes.size(),
                    commentaries.size(),
                    p.getPostDate(),
                    p.getCreatedPictureDate(),
                    p.getLocationId(),
                    p.getUserId(),
                    liked,
                    disliked);

            postDetailsDtos.add(postDetailsDto);
        }

        if(sortBy == null && sortOrder != null)
            return new ResponseEntity<>(
                    "You have to provide sortBy criteria if you provide sortOrder.",
                    HttpStatus.BAD_REQUEST);
        else if(sortBy == null)
            sortBy = SortType.DATE;

        var comparator = switch (sortBy) {
            case DATE -> Comparator.comparing(PostDetailsDto::getPostDate);
            case LIKES -> Comparator.comparing(PostDetailsDto::getLikes);
            case DISLIKES -> Comparator.comparing(PostDetailsDto::getDislikes);
            case COMMENTARIES -> Comparator.comparing(PostDetailsDto::getCommentaryCounter);
        };

        if(comparator != null) {
            if (SortOrder.DESC.equals(sortOrder))
                comparator = comparator.reversed();

            postDetailsDtos.sort(comparator);
        }

        return new ResponseEntity<>(postDetailsDtos, HttpStatus.OK);
    }

    @GetMapping(path = "{postId}/images")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getImages(@PathVariable long postId) {
        return postImageService.getImages(postId);
    }

    @GetMapping(path = "feed")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> feed(@RequestParam int pageNumber,
                                  @RequestParam int pageSize,
                                  HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String username = (String) claims.get("username");

        User loggedUser = userService.getUserByUsername(username);

        List<Post> posts = postService.feed(username, pageNumber, pageSize);

        List<PostDetailsDto> postDetailsDtos = new ArrayList<>();

        for (Post p : posts) {
            List<Like> likes = postService.getLikesForPost(p.getId());
            List<Dislike> dislikes = postService.getDislikesForPost(p.getId());
            List<Commentary> commentaries = commentaryService.getCommentariesForPost(p.getId());

            boolean liked = likes.stream().anyMatch(d -> d.getUserId() == loggedUser.getId());
            boolean disliked = dislikes.stream().anyMatch(d -> d.getUserId() == loggedUser.getId());

            PostDetailsDto postDetailsDto = new PostDetailsDto(
                    p.getId(),
                    p.getDescription(),
                    likes.size(),
                    dislikes.size(),
                    commentaries.size(),
                    p.getPostDate(),
                    p.getCreatedPictureDate(),
                    p.getLocationId(),
                    p.getUserId(),
                    liked,
                    disliked);

            postDetailsDtos.add(postDetailsDto);
        }

        return new ResponseEntity<>(postDetailsDtos,HttpStatus.OK);
    }

    @PostMapping(path="{postId}/images",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = {MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> uploadImages(@PathVariable Long postId,
                                          @RequestPart("images") MultipartFile[] images) throws IOException {
        var indexesOfFilesWithInvalidExt = postImageService.uploadImages(images, postId);

        for (var image: images) {
            System.out.printf("Received data: image[ContentType=%s, OriginalFilename=%s, Name=%s]; postId[%d]%n",
                image.getContentType(),
                image.getOriginalFilename(),
                image.getName(),
                postId);
        }

        if (indexesOfFilesWithInvalidExt.size() != 0)
            return new ResponseEntity<>("Allowed extensions are: jpg, jpeg, webp, png. " +
                    "Images with following ordinal numbers do not have valid extension: " + indexesOfFilesWithInvalidExt,
                    HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Images are uploaded successfully.", HttpStatus.OK);
    }

    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> createPost(@RequestBody CreatePostDto createPostDto, HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long id = ((Number) claims.get("id")).longValue();

        Post post = postService.createPost(createPostDto, id);

        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PutMapping(path = "{postId}/like")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> likePost(@PathVariable long postId, HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long id = ((Number) claims.get("id")).longValue();

        postService.likePost(postId, id);
        return new ResponseEntity<>("Post liked.", HttpStatus.OK);
    }

    @PutMapping(path = "{postId}/dislike")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> dislikePost(@PathVariable long postId, HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long id = ((Number) claims.get("id")).longValue();

        postService.dislikePost(postId, id);
        return new ResponseEntity<>("Post disliked.", HttpStatus.OK);
    }

    @PutMapping("update")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> updatePost(@RequestBody UpdatePostDto updatePostDto)
    {
        postService.updatePost(updatePostDto);

        return new ResponseEntity<>("Post updated.", HttpStatus.OK);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deletePost(@RequestBody long postId){
        postService.deletePost(postId);
        return new ResponseEntity<>("Post deleted.",HttpStatus.OK);
    }
}