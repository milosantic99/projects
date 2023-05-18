package imi.jazzberry.server.start;

import imi.jazzberry.server.dto.UserRegistrationDto;
import imi.jazzberry.server.model.Role;
import imi.jazzberry.server.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class Start {

    private final UserService userService;

    public Start(UserService userService)
    {
        this.userService = userService;
    }

    @Bean
    public void addStandardRoles() {
        Role role1 = new Role();
        Role role2 = new Role();

        role1.setRoleName("ROLE_ADMIN");
        userService.addRole(role1);

        role2.setRoleName("ROLE_DEVELOPER");
        userService.addRole(role2);
    }

    @Bean
    public void addAdminDevUsers()
    {

        UserRegistrationDto user = new UserRegistrationDto();
        user.setUsername("peradev");
        user.setPassword("K@lendar2020");
        user.setEmail("peradev@test.com");
        user.setFirstName("Pera");
        user.setLastName("Developer");
        userService.registerUser(user);

        user.setUsername("peraadmin");
        user.setPassword("K@lendar2020");
        user.setEmail("peraadmin@test.com");
        user.setFirstName("Pera");
        user.setLastName("Admin");
        userService.registerUser(user);
    }

    @Bean
    public void addRoleToUsers()
    {
        userService.addRoleToUser("peradev","ROLE_DEVELOPER");
        userService.addRoleToUser("peraadmin","ROLE_ADMIN");
    }
}
