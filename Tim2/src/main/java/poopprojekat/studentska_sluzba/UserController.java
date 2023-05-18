package poopprojekat.studentska_sluzba;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

//INCLUDES:
// /get_user?token=&username=&password= -returns user with given username
// /get_all_users?token= -return all users
// /add_user?token=&username=&password=&year= -adds new user with given username, password
// /update_user?token=&username=&new_username=&new_password=&new_role= -updates user with given username, sets new given values
// /delete_user?token=&unique_id= -deletes user with given id

@RestController
public class UserController {

    @PostMapping("/get_all_users")
    public ArrayList<User> get_all_users(@RequestParam("token") long token){

        if (!Log_in_Controller.access_allowed(token, new String[][] {{"Admin", "any"}})) return null;
        return Database.GetAllUsers();
    }

    @PostMapping("/get_user")
    public String[] get_user(@RequestParam("token") long token,
                             @RequestParam("username") String username,
                             @RequestParam("password") String password){

        if (!Log_in_Controller.access_allowed(token, new String[][] {{"Admin", "any"}})) return null;

        String[] tmp = Database.GetUser(username, password);

        if (tmp == null) return new String[]{"User don't exist", null};
        return tmp;
    }

    @PostMapping("/add_user")
    public String add_user(@RequestParam("token") long token,
                           @RequestParam("username") String username,
                           @RequestParam("password") String password,
                           @RequestParam("role") String role,
                           @RequestParam("year") int year){

        if (!Log_in_Controller.access_allowed(token, new String[][] {{"Admin", "any"}})) return null;

        User user = new User(username, password, role);

        // String index = Database.GetHighestIndex(year) + "/" + year;
        try {
            Database.AddUser(user);
            return "User successfully added";
        } catch (Exception e) {
            e.printStackTrace();
            return "Couldn't add user because of the following error: " + e.getMessage();
        }
    }

    @PostMapping("/update_user")
    public String update_user(@RequestParam("username") String username,
                              @RequestParam("new_username") String new_username,
                              @RequestParam("new_password") String new_password){

        if (new_username.equals("")) new_username = null;
        if (new_password.equals("")) new_password = null;

        User updated_user = new User(new_username, new_password,null, null);
        try{
            Database.EditUser(username, updated_user);
            return "User successfully updated";
        } catch (Exception e) {
            e.printStackTrace();
            return "Couldn't update user because of the following error: " + e.getMessage();
        }
    }

    @PostMapping("/delete_user")
    public String delete_user(@RequestParam("token") long token,
                              @RequestParam("unique_id") String id){

        if (!Log_in_Controller.access_allowed(token, new String[][] {{"Admin", "any"}})) return null;

        try{
            Database.DeleteUser(id);
            return "User successfully deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Couldn't delete user because of the following error: " + e.getMessage();
        }
    }

}
