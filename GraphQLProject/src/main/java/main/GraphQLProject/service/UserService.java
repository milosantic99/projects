package main.GraphQLProject.service;

import main.GraphQLProject.dto.UserAddDto;
import main.GraphQLProject.dto.UserUpdateDto;
import main.GraphQLProject.repository.UserRepository;
import main.GraphQLProject.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){

        User user = userRepository.getUserById(id);

        return userRepository.getReferenceById(id);
    }

    public User addUser(UserAddDto userDto) {
        User user = new User(userDto.getName(), userDto.getEmail());

        userRepository.save(user);

        return user;
    }

    public User updateUser(UserUpdateDto userDto) {
        User user = userRepository.getUserById(userDto.getId());

        if(userDto.getEmail() != null)
            user.setEmail(userDto.getEmail());
        if(userDto.getName() != null)
            user.setName(userDto.getName());

        userRepository.save(user);

        return user;
    }

    public void deleteUser(long id) {
        User user = userRepository.getUserById(id);

        userRepository.delete(user);
    }
}
