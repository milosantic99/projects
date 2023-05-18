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
@RequestMapping(path = "api/v1/commentaries/second")
public class CommentarySecondLevelController {
    private final CommentaryService commentaryService;
    private final JwtService jwtService;

    @Autowired
    public CommentarySecondLevelController(CommentaryService commentaryService, JwtService jwtService){
        this.commentaryService = commentaryService;
        this.jwtService = jwtService;
    }

    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> commentSecondLevel(@RequestParam long postId, @RequestParam long commentaryId, @RequestParam String content, HttpServletRequest request){
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId =  ((Number) claims.get("id")).longValue();

        commentaryService.commentSecondLevel(postId,commentaryId,content,userId);
        return new ResponseEntity<>("Commentary commented.", HttpStatus.OK);
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getSecondLevelComment(@RequestParam long postId, @RequestParam long commentaryId){
        return new ResponseEntity<>(commentaryService.getSecondLevelComment(postId,commentaryId),HttpStatus.OK);
    }

    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> updateSecondLevelComment(@RequestBody CommentaryUpdateDto commentaryUpdateDto){
        commentaryService.updateSecondLevelComment(commentaryUpdateDto);

        return new ResponseEntity<>("Comment updated.",HttpStatus.OK);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteSecondLevelComment(@RequestBody long commentaryId){
        commentaryService.deleteSecondLevelComment(commentaryId);

        return new ResponseEntity<>("Comment deleted.",HttpStatus.OK);
    }
}
