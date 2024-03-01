package main.GraphQLProject.fetcher;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import main.GraphQLProject.dto.UserAddDto;
import main.GraphQLProject.dto.UserUpdateDto;
import main.GraphQLProject.model.User;
import main.GraphQLProject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@DgsComponent
public class UserDataFetcher {

    private final UserService userService;

    public UserDataFetcher(UserService userService) {
        this.userService = userService;
    }

    @DgsQuery
    public List<User> users(){

        return userService.getAllUsers();
    }

    @DgsQuery
    public User userById(@InputArgument String id){
        var newId = Long.parseLong(id);

        return userService.getUserById(newId);
    }

    @DgsMutation
    public User addUser(@InputArgument UserAddDto user){

        return userService.addUser(user);
    }

    @DgsMutation
    public User updateUser(@InputArgument UserUpdateDto user){

        return userService.updateUser(user);
    }

    @DgsMutation
     public User deleteUser(@InputArgument String id){
        var newId = Long.parseLong(id);

        User user = userService.getUserById(newId);

        userService.deleteUser(newId);

        return user;
    }
}
