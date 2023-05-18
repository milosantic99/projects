package imi.jazzberry.server.controller;

import imi.jazzberry.server.dto.CommentaryUpdateDto;
import imi.jazzberry.server.service.CommentaryService;
import imi.jazzberry.server.service.JwtService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("api/v1/commentaries")
public class CommentaryController {
    private final CommentaryService commentaryService;
    private final JwtService jwtService;

    @Autowired
    public CommentaryController(CommentaryService commentaryService, JwtService jwtService){
        this.commentaryService = commentaryService;
        this.jwtService = jwtService;
    }

    @GetMapping("{postId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getCommentariesForPost(@PathVariable("postId") long postId){
        return new ResponseEntity<>(commentaryService.getCommentariesForPost(postId), HttpStatus.OK);
    }

    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> commentPost(@RequestParam long postId, @RequestParam String content, HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId =  ((Number) claims.get("id")).longValue();

        commentaryService.commentPost(postId, content, userId);
        return new ResponseEntity<>("Post commented.",HttpStatus.OK);
    }

    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> updateComment(@RequestBody CommentaryUpdateDto commentaryUpdateDto){
        commentaryService.updateComment(commentaryUpdateDto);

        return new ResponseEntity<>("Comment updated.",HttpStatus.OK);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteComment(@RequestBody long commentaryId){
        commentaryService.deleteComment(commentaryId);
        return new ResponseEntity<>("Commentary deleted.",HttpStatus.OK);
    }
}
