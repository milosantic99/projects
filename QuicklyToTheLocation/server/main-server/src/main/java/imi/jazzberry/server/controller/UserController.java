package imi.jazzberry.server.controller;

import imi.jazzberry.server.dto.*;
import imi.jazzberry.server.enums.ResponseEntityEnum;
import imi.jazzberry.server.model.Role;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.service.FollowingService;
import imi.jazzberry.server.service.JwtService;
import imi.jazzberry.server.service.UserImageService;
import imi.jazzberry.server.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {

    private final UserService userService;

    private final UserImageService userImageService;

    private final JwtService jwtService;
    private final FollowingService followingService;


    @Autowired
    public UserController(
            UserService userService,
            UserImageService userImageService,
            JwtService jwtService,
            FollowingService followingService) {
        this.userService = userService;
        this.userImageService = userImageService;
        this.jwtService = jwtService;
        this.followingService = followingService;
    }

    @GetMapping(path="user")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getUser(@RequestParam(required = false) Long id,
                                     @RequestParam(required = false) String username,
                                     HttpServletRequest request) {
        if(id == null
        && (username == null || "".equals(username)))
            return new ResponseEntity<>("You should provide an identifier.",HttpStatus.BAD_REQUEST);

        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String usernameFromJwt = (String) claims.get("username");

        User user;

        if(id == null)
            user = userService.getUserByUsername(username);
        else
            user = userService.getUserByUserId(id);

        if(user == null)
            return new ResponseEntity<>("User is not found.",HttpStatus.NOT_FOUND);

        var isFollowing = followingService.isFollowing(usernameFromJwt, username);

        return new ResponseEntity<>(new UserDetailsDto(user, isFollowing), HttpStatus.OK);
    }

    @GetMapping(path="all")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getAllUsers() {
        var allUsers = userService.getAllUsers();
        if(allUsers == null)
            allUsers = List.of();

        return new ResponseEntity<>(allUsers,HttpStatus.OK);
    }

    @GetMapping(path="{username}/image")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getImage(@PathVariable String username) {

        var img = userImageService.getImage(username);

        if(img == null)
            return new ResponseEntity<>(
                    "User with username '" + username + "' does not exist", HttpStatus.BAD_REQUEST);

        if(img.getImage() == null)
            return new ResponseEntity<>(
                    "User with username '" + username + "' does not have profile picture", HttpStatus.NOT_FOUND);

        return ResponseEntity
                .ok()
                .body(img);
    }

    @PostMapping(path="register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDto user) {
        ResponseEntityEnum responseEntityEnum = userService.registerUser(user);

        if(responseEntityEnum == ResponseEntityEnum.USER_CONTAINS_BLANK)
            return new ResponseEntity<>("Username is blank or contains blank character.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.USER_INVALID)
            return new ResponseEntity<>("""
                    Username policy is:

                    Minimum 3 characters

                    Maximum 15 characters

                    Can contain _ and .""",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.PASSWORD)
            return new ResponseEntity<>("""
                    The password policy is: At least 8 chars

                    Contains at least one digit

                    Contains at least one lower alpha character and one upper alpha character

                    Contains at least one char within a set of special chars (@#%$^ etc.)""",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.USER_EXIST)
            return new ResponseEntity<>("Username already exists.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.EMAIL)
            return new ResponseEntity<>("Email already exists.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.EMAIL_INVALID)
            return new ResponseEntity<>("Email is invalid.", HttpStatus.BAD_REQUEST);

        userService.addRoleToUser(user.getUsername(), "ROLE_USER");

        return new ResponseEntity<>("Successfully registered.",HttpStatus.OK);
    }

    @PostMapping(path="role")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> addRole(@RequestBody Role role) {
        ResponseEntityEnum responseEntityEnum = userService.addRole(role);

        if(responseEntityEnum == ResponseEntityEnum.ROLE_EXIST)
            return new ResponseEntity<>("Role already exists.",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Role successfully added.",HttpStatus.OK);
    }

    @PostMapping(path="{username}/role")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> addRoleToUser(@RequestBody RoleUserDto roleUserDto,
                                                @PathVariable("username") String username) {
        ResponseEntityEnum responseEntityEnum = userService.addRoleToUser(username, roleUserDto.getRole());

        if(responseEntityEnum == ResponseEntityEnum.USER_DOES_NOT_EXIST)
            return new ResponseEntity<>("User not found.",HttpStatus.NOT_FOUND);

        if(responseEntityEnum == ResponseEntityEnum.ROLE_EXIST)
            return new ResponseEntity<>("User already has given role.",HttpStatus.OK);

        if(responseEntityEnum == ResponseEntityEnum.ROLE_DOES_NOT_EXIST)
            return new ResponseEntity<>("Role not found.",HttpStatus.NOT_FOUND);

        return new ResponseEntity<>("Role successfully added to user.",HttpStatus.OK);
    }

    @PostMapping(path="{username}/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = {MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> uploadImage(@PathVariable String username,
                                         @RequestPart("image") MultipartFile image,
                                         HttpServletRequest request)
            throws IOException {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String usernameFromJwt = (String) claims.get("username");

        if(! username.equals(usernameFromJwt))
            return new ResponseEntity<>(
                    String.format("User %s is not allowed to change information about user %s",
                            usernameFromJwt, username),
                    HttpStatus.FORBIDDEN);

        String imgRepr = String.format("image[ContentType=%s, OriginalFilename=%s, Name=%s]",
                image.getContentType(),
                image.getOriginalFilename(),
                image.getName());

        System.out.printf("Received data: %s; username[%s]%n", imgRepr, username);

        ResponseEntityEnum responseEntityEnum = userImageService.uploadImage(image, username);

        if (responseEntityEnum == ResponseEntityEnum.NOT_PICTURE)
            return new ResponseEntity<>("The file you want to upload "
                    + imgRepr +" is not a picture.", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Image uploaded successfully.", HttpStatus.OK);
    }

    @PutMapping(path = "update")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateDto user, HttpServletRequest request) {

        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        long userId = ((Number) claims.get("id")).longValue();

        ResponseEntityEnum responseEntityEnum = userService.updateUser(user,userId);

        if(responseEntityEnum == ResponseEntityEnum.EMAIL)
            return new ResponseEntity<>("Email already exists.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.EMAIL_INVALID)
            return new ResponseEntity<>("Invalid email.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.USER_NOT_FOUND)
            return new ResponseEntity<>("User is not found.",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("User successfully updated.",HttpStatus.OK);
    }

    @PutMapping(path="password")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> updatePassword(@RequestBody UserPasswordUpdateDto userPasswordUpdateDto,
                                                 HttpServletRequest request) {
        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String username = (String) claims.get("username");

        ResponseEntityEnum responseEntityEnum = userService.updatePassword(userPasswordUpdateDto, username);

        if(responseEntityEnum == ResponseEntityEnum.USER_DOES_NOT_EXIST)
            return new ResponseEntity<>("User does not exist.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.OLD_PASSWORD_MISMATCH)
            return new ResponseEntity<>("Old password is not correct.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.PASSWORD)
            return new ResponseEntity<>("""
                    The password policy is: At least 8 chars

                    Contains at least one digit

                    Contains at least one lower alpha character and one upper alpha character

                    Contains at least one char within a set of special chars (@#%$^ etc.)""",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Password successfully updated.",HttpStatus.OK);
    }

    @DeleteMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> deleteUser(HttpServletRequest request, @RequestBody String password) {

        var claims = jwtService.extractJwtClaimsFromHeader(request.getHeader(AUTHORIZATION));
        String username = (String) claims.get("username");

        ResponseEntityEnum responseEntityEnum = userService.deleteUser(username,password);

        if(responseEntityEnum == ResponseEntityEnum.USER_DOES_NOT_EXIST)
            return new ResponseEntity<>("User does not exist.",HttpStatus.BAD_REQUEST);

        if(responseEntityEnum == ResponseEntityEnum.PASSWORD)
            return new ResponseEntity<>("Provided password is not valid.",HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("User successfully deleted.",HttpStatus.OK);
    }

}
