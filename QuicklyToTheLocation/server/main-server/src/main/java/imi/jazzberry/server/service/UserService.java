package imi.jazzberry.server.service;

import imi.jazzberry.server.dto.UserPasswordUpdateDto;
import imi.jazzberry.server.dto.UserRegistrationDto;
import imi.jazzberry.server.dto.UserUpdateDto;
import imi.jazzberry.server.enums.ResponseEntityEnum;
import imi.jazzberry.server.model.*;
import imi.jazzberry.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RoleRepository roleRepository;
    private final PostImageRepository postImageRepository;
    private final CommentaryRepository commentaryRepository;
    private final CommentarySecondLevelRepository commentarySecondLevelRepository;
    private final FollowingRepository followingRepository;
    private final LikeRepository likeRepository;
    private final DislikeRepository dislikeRepository;
    private final PostRepository postRepository;

    @Autowired
    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       RoleRepository roleRepository,
                       PostImageRepository postImageRepository,
                       CommentaryRepository commentaryRepository,
                       CommentarySecondLevelRepository commentarySecondLevelRepository,
                       FollowingRepository followingRepository,
                       LikeRepository likeRepository,
                       DislikeRepository dislikeRepository,
                       PostRepository postRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
        this.postImageRepository = postImageRepository;
        this.commentaryRepository = commentaryRepository;
        this.commentarySecondLevelRepository = commentarySecondLevelRepository;
        this.followingRepository = followingRepository;
        this.likeRepository = likeRepository;
        this.dislikeRepository = dislikeRepository;
        this.postRepository = postRepository;
    }

    public User getUserByUserId(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public ResponseEntityEnum registerUser(UserRegistrationDto userDto) {

        if(userDto.getUsername().isBlank() && userDto.getUsername().contains(" "))
            return ResponseEntityEnum.USER_CONTAINS_BLANK;

        if(!userDto.getUsername().matches("[a-zA-Z0-9_.]{3,15}"))
            return ResponseEntityEnum.USER_INVALID;

        if(!userDto.getPassword().matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()=_+{}\\[\\];:'\"\\\\,./?><-]).{8,}"))
            return ResponseEntityEnum.PASSWORD;

        if(!userDto.getEmail().matches("^[_A-Za-z0-9+-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"))
            return ResponseEntityEnum.EMAIL_INVALID;

        Optional<User> userUsernameOptional = Optional.ofNullable(
                userRepository.findUserByUsername(userDto.getUsername())
        );

        Optional<User> userEmailOptional = Optional.ofNullable(userRepository.findUserByEmail(userDto.getEmail()));

        if(userUsernameOptional.isPresent())
            return ResponseEntityEnum.USER_EXIST;
        else if(userEmailOptional.isPresent())
            return ResponseEntityEnum.EMAIL;

        Optional<Role> roleOptional = Optional.ofNullable(
                roleRepository.findByRoleName("ROLE_USER")
        );

        if(roleOptional.isEmpty()) {
            Role role = new Role();

            role.setRoleName("ROLE_USER");

            roleRepository.save(role);
        }

        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPassword(),
                new ArrayList<>(),
                0,
                0,
                0,
                0,
                0
        );

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);

        return ResponseEntityEnum.OK;
    }

    public ResponseEntityEnum updateUser(UserUpdateDto userUpdateDto, long userId){

        User user = userRepository.findUserById(userId);

        if(user != null && user.getEmail().equals(userUpdateDto.getEmail()))
        {
            if(userUpdateDto.getFirstName() == null && userUpdateDto.getLastName() == null){
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getFirstName() == null && userUpdateDto.getDescription() == null){
                user.setLastName(userUpdateDto.getLastName());
            } else if(userUpdateDto.getLastName() == null && userUpdateDto.getDescription() == null) {
                user.setFirstName(userUpdateDto.getFirstName());
            } else if(userUpdateDto.getFirstName() == null){
                user.setLastName(userUpdateDto.getLastName());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getLastName() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getDescription() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setLastName(userUpdateDto.getLastName());
            } else{
                user.setFirstName(userUpdateDto.getFirstName());
                user.setLastName(userUpdateDto.getLastName());
                user.setDescription(userUpdateDto.getDescription());
            }

            userRepository.save(user);

            return ResponseEntityEnum.OK;
        }
        else if(user != null) {

            Optional<User> userEmailOptional = Optional.ofNullable(
                    userRepository.findUserByEmail(userUpdateDto.getEmail())
            );

            if(userEmailOptional.isPresent())
            {
                return ResponseEntityEnum.EMAIL;
            }

            if(!user.getEmail().matches("^[_A-Za-z0-9+-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"))
                return ResponseEntityEnum.EMAIL_INVALID;

            if(userUpdateDto.getFirstName() == null && userUpdateDto.getLastName() == null && userUpdateDto.getDescription() == null){
                user.setEmail(userUpdateDto.getEmail());
            } else if(userUpdateDto.getFirstName() == null && userUpdateDto.getLastName() == null && userUpdateDto.getEmail() == null){
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getEmail() == null && userUpdateDto.getLastName() == null && userUpdateDto.getDescription() == null){
                user.setFirstName(userUpdateDto.getFirstName());
            } else if(userUpdateDto.getFirstName() == null && userUpdateDto.getLastName() == null){
                user.setEmail(userUpdateDto.getEmail());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getFirstName() == null && userUpdateDto.getDescription() == null){
                user.setLastName(userUpdateDto.getLastName());
                user.setEmail(userUpdateDto.getEmail());
            } else if(userUpdateDto.getFirstName() == null && userUpdateDto.getEmail() == null){
                user.setDescription(userUpdateDto.getDescription());
                user.setLastName(userUpdateDto.getLastName());
            } else if(userUpdateDto.getLastName() == null && userUpdateDto.getDescription() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setEmail(userUpdateDto.getEmail());
            } else if(userUpdateDto.getLastName() == null && userUpdateDto.getEmail() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getDescription() == null && userUpdateDto.getEmail() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setLastName(userUpdateDto.getLastName());
            } else if(userUpdateDto.getFirstName() == null){
                user.setEmail(userUpdateDto.getEmail());
                user.setLastName(userUpdateDto.getLastName());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getLastName() == null){
                user.setEmail(userUpdateDto.getEmail());
                user.setFirstName(userUpdateDto.getFirstName());
                user.setDescription(userUpdateDto.getDescription());
            } else if(userUpdateDto.getDescription() == null){
                user.setEmail(userUpdateDto.getEmail());
                user.setLastName(userUpdateDto.getLastName());
                user.setFirstName(userUpdateDto.getFirstName());
            } else if(userUpdateDto.getEmail() == null){
                user.setFirstName(userUpdateDto.getFirstName());
                user.setLastName(userUpdateDto.getLastName());
                user.setDescription(userUpdateDto.getDescription());
            } else{
                user.setEmail(userUpdateDto.getEmail());
                user.setFirstName(userUpdateDto.getFirstName());
                user.setLastName(userUpdateDto.getLastName());
                user.setDescription(userUpdateDto.getDescription());
            }

            userRepository.save(user);

            return ResponseEntityEnum.OK;
        }
        return ResponseEntityEnum.USER_NOT_FOUND;
    }

    public ResponseEntityEnum addRole(Role role) {
        Optional<Role> roleOptional = Optional.ofNullable(roleRepository.findByRoleName(role.getRoleName()));

        if(roleOptional.isPresent())
            return ResponseEntityEnum.ROLE_EXIST;

        roleRepository.save(role);
        return ResponseEntityEnum.OK;
    }

    public ResponseEntityEnum addRoleToUser(String username, String roleName) {
        User user = userRepository.findUserByUsername(username);

        if(user == null)
            return ResponseEntityEnum.USER_DOES_NOT_EXIST;

        Role role = roleRepository.findByRoleName(roleName);

        if(role == null)
            return ResponseEntityEnum.ROLE_DOES_NOT_EXIST;

        for (Role r:user.getRoles()
             ) {
            if(r.getRoleName().equals(roleName))
                return ResponseEntityEnum.ROLE_EXIST;
        }

        user.getRoles().add(role);

        return ResponseEntityEnum.OK;
    }

    public ResponseEntityEnum deleteUser(String username, String password) {

        Optional<User> userUsernameOptional = Optional.ofNullable(userRepository.findUserByUsername(username));

        if(userUsernameOptional.isEmpty())
            return ResponseEntityEnum.USER_DOES_NOT_EXIST;

        if(!bCryptPasswordEncoder.matches(password, userUsernameOptional.get().getPassword()))
            return ResponseEntityEnum.PASSWORD;

        User user = userRepository.findUserByUsername(username);

        Optional<List<Commentary>> userCommentaryOptional = Optional.ofNullable(commentaryRepository.findByUserId(user.getId()));

        userCommentaryOptional.ifPresent(commentaryRepository::deleteAll);

        Optional<List<CommentarySecondLevel>> userSecondLevelCommentaryOptional = Optional.ofNullable(commentarySecondLevelRepository.findByUserId(user.getId()));

        userSecondLevelCommentaryOptional.ifPresent(commentarySecondLevelRepository::deleteAll);

        Optional<List<Following>> userFollowingOptional = Optional.ofNullable(followingRepository.findByAnyUser(user.getUsername()));

        userFollowingOptional.ifPresent(followingRepository::deleteAll);

        Optional<List<Like>> userLikeOptional = Optional.ofNullable(likeRepository.findByUserId(user.getId()));

        userLikeOptional.ifPresent(likeRepository::deleteAll);

        Optional<List<Dislike>> userDislikeOptional = Optional.ofNullable(dislikeRepository.findByUserId(user.getId()));

        userDislikeOptional.ifPresent(dislikeRepository::deleteAll);

        Optional<List<Post>> postOptional = Optional.ofNullable(postRepository.findPostsByUserId(user.getId()));

        postOptional.ifPresent(postRepository::deleteAll);

        userRepository.delete(userUsernameOptional.get());

        return ResponseEntityEnum.OK;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);

        if(user == null)
            throw new IllegalStateException("User is not found.");

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        });

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),user.getPassword(), authorities
        );
    }

    public ResponseEntityEnum updatePassword(UserPasswordUpdateDto userPasswordUpdateDto, String username) {
        User user = userRepository.findUserByUsername(username);

        if(user == null)
            return ResponseEntityEnum.USER_DOES_NOT_EXIST;

        if(!bCryptPasswordEncoder.matches(userPasswordUpdateDto.getOldPassword(), user.getPassword()))
            return ResponseEntityEnum.OLD_PASSWORD_MISMATCH;

        if(!userPasswordUpdateDto.getNewPassword().matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()=_+{}\\[\\];:'\"\\\\,./?><-]).{8,}"))
            return ResponseEntityEnum.PASSWORD;

        String encodedPassword = bCryptPasswordEncoder.encode(userPasswordUpdateDto.getNewPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);

        return ResponseEntityEnum.OK;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
